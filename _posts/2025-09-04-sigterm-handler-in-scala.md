---
title: "Handling SIGTERM signal in a Scala application"
tags: [scala, kubernetes, SIGTERM]
excerpt: "Graceful shutdown"
---

#### Context:
I have just developed a simple ETL application - extracting and transforming large files from S3, and loading it into a Postgres database, using a Kubernetes cronjob, with configured parallelism.

A state management is employed using Postgres row-locking to ensure no two pod runs the same job at the same time, and is used to track the completion of jobs, which will prevent re-running successful jobs after a failure or manual retrigger.

[1] Managed states
- `Pending`: "I am waiting to be picked up 🔔"
- `Processing`: "I am busy, please move on 🚧"
- `Completed`: "I am done ✅"
- `Failed`: "I have encountered a problem ❌"

A major challenge in building reliable data pipelines is handling unexpected interruptions, which could lead to an undesireable result, like having incomplete or stale jobs and data in the database.


#### How should we handle this?

![Courtsey of Gemini](/images/sigterm-handling.png)

1. Understand how Kubernetes shuts down a pod

Kubernetes sends an initial **SIGTERM** signal to the pod, requesting to terminate running processes within a set duration (a default of 30 seconds), before sending a **SIGKILL** signal, forcing an immediate termination of the pod processes.

The waiting duration can be configured using the `terminationGracePeriodSeconds` config.

2. Handle the signal and handle shutdown tasks

The underlying application is responsible for listening to and handling the initial **SIGTERM** cancelation signal within the grace period. Handling the signal can varying from rolling back updates, to cleaning up data and resources.

#### Handling cancelation in a Scala Cats-Effect 3.x
Below is a sample app that runs a simulated task in an IO effects:

```scala
import cats.effect._
import scala.concurrent.duration._
import scala.util.Random

object TestApp extends IOApp {
    override def run(args: List[String]): IO[ExitCode] = {
        val jobs(min: Long = 10L): IO[Unit] = 
            IO.defer {
                val waitTime = Duration(Random.nextLong(min), "sec")
                IO.sleep(waitTime) *> IO.pure(ExitCode.Success)
            }

        jobs()
          .guaranteeCase {
              case Outcome.Succeeded(fa) =>
                // Handles success: log and run the final successful effect
                IO.println("INFO: Successful exit!!") *> fa.void 
              case Outcome.Canceled()    =>
                // Handles cancellation (e.g., SIGTERM): clean up resources
                IO.println("WARN: Terminating due to interruption [e.g SIGTERM]") *> shutdown()
              case Outcome.Errored(err)  =>
                // Handles errors: log the error and run the shutdown
                IO.println("ERROR: Terminating due to $err") *> shutdown()
         }
    }

    // for example: Cleanup resoruces or rollback changes
    def shutdown(): IO[Unit] =
        IO.sleep(1.second) *> IO.println("Shutdown complete)
}
```

These are the possible outcomes if you run the sample:
* if everything goes well, it will print <i>"INFO: Successful exit!!"</i>
* if a runtime exception occurs, it will print <i>"ERROR: Terminating due to [...]"</i>
* if you press `Ctrl-C` or `kill -15 <pid>` from the terminal, it will print <i>"WARN: Terminating due to interruption [e.g SIGTERM]"</i>

##### Some notes
1. The **IO#guaranteeCase** function has the following signature --
```scala
    def guaranteeCase(finalizer: OutcomeIO[A @uncheckedVariance] => IO[Unit]): IO[A] = ???
```
where the finalizer is executed based on the outcome, either in success or in error, or if cancelled.

2. The `Outcome.Canceled` is the called as a result of a SIGTERM signal

#### Conclusion
By properly handling termination signals, we ensure that our ETL jobs either complete successfully or fail cleanly, leaving no stale or incomplete data behind. This 'all-or-nothing' approach is crucial for building reliable and resilient data systems.

#### References
- [Dealing with cancelation](https://typelevel.org/cats-effect/docs/tutorial#dealing-with-cancelation)
- [Cancelation and Resource Release in CE v2](https://typelevel.org/cats-effect/docs/2.x/datatypes/ioapp#cancelation-and-safe-resource-release)
