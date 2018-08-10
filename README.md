# taherbs.github.io

Personal website/blog repo.

## Run locally

### Prequisites
* Docker
* Docker-compose
* Make

### Command
```bash
# Run the website
$ make start

# Stop the website
$ make stop

# Refresh the website
$ make refresh

# Show logs
$ make logs
```

Navigate in browser to `http://<IP>:4000/` to view files, including draft files.

## Push to github.io

Simply commit your code, then `git push origin master`, wait a few minutes, and then
visit the Blog URL: https://taherbs.github.io.