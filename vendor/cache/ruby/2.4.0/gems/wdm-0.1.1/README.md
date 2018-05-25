# Windows Directory Monitor (WDM)

Windows Directory Monitor (WDM) is a thread-safe ruby library which can be used to monitor directories for changes on Windows.

It's mostly implemented in C and uses the Win32 API for a better performance.

**Important**: WDM only runs on ruby versions >= *1.9.2*! 

## Installation

If you are using Bundler, add the following line to your application's Gemfile:

    gem 'wdm'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install wdm

## Usage

For a simple example on how to use WDM, you can take a look at the `example` directory of the repository.

## Benchmarks

You can find a comparison of different ruby libraries for watching directory changes on Windows in the `benchmark` directory of the repository.

## Reference

### `WDM::Monitor`

To start watching directories, you need an instance of `WDM::Monitor`:

```ruby
monitor = WDM::Monitor.new
```

After that, register a callback for each directory you want to watch:

```ruby
# Watch a single directory
monitor.watch('C:\Users\Maher\Desktop') { |change|  puts change.path }

# Watch a directory with its subdirectories
monitor.watch_recursively('C:\Users\Maher\Projects\my_project') { |change|  puts change.path }
```

Both `Monitor#watch` and `Monitor#watch_recursively` can take a series of options after the first parameter to specify the watching options:

```ruby
# Report changes to directories in the watched directory (Ex.: Addition of an empty directory)
monitor.watch('C:\Users\Maher\Desktop', :default, :directories)
```

The supported options are:

<table>
  <thead>
    <tr>
      <th>Value</th>
      <th>Meaning</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>:default</td>

      <td>
        The default set of options for watching directories. It's a combination of the :files, :directories and the :last_write options.
      </td>
    </tr>
    
    <tr>
      <td>:files</td>

      <td>
        Any file name change in the watched directory or subtree causes a change
        notification wait operation to return. Changes include renaming, creating, or
        deleting a file.
      </td>
    </tr>

    <tr>
      <td>:directories</td>

      <td>
        Any directory-name change in the watched directory or subtree causes a
        change notification wait operation to return. Changes include creating or
        deleting a directory.
      </td>
    </tr>

    <tr>
      <td>:attributes</td>

      <td>
        Any attribute change in the watched directory or subtree causes a change
        notification wait operation to return.
      </td>
    </tr>

    <tr>
      <td>:size</td>

      <td>
        Any file-size change in the watched directory or subtree causes a change
        notification wait operation to return. The operating system detects a change in
        file size only when the file is written to the disk. For operating systems that
        use extensive caching, detection occurs only when the cache is sufficiently
        flushed.
      </td>
    </tr>

    <tr>
      <td>:last_write</td>

      <td>
        Any change to the last write-time of files in the watched directory or
        subtree causes a change notification wait operation to return. The operating
        system detects a change to the last write-time only when the file is written to
        the disk. For operating systems that use extensive caching, detection occurs
        only when the cache is sufficiently flushed.
      </td>
    </tr>

    <tr>
      <td>:last_access</td>

      <td>
        Any change to the last access time of files in the watched directory or
        subtree causes a change notification wait operation to return.
      </td>
    </tr>

    <tr>
      <td>:creation</td>

      <td>
        Any change to the creation time of files in the watched directory or subtree
        causes a change notification wait operation to return.
      </td>
    </tr>

    <tr>
      <td>:security</td>

      <td>
        Any security-descriptor change in the watched directory or subtree causes a
        change notification wait operation to return.
      </td>
    </tr>
  </tbody>
</table>

These options map to the filters that `ReadDirectoryChangesW` takes in its `dwNotifyFilter` parameter. You can find more info on the [docs page](http://msdn.microsoft.com/en-us/library/windows/desktop/aa365465.aspx) of `ReadDirectoryChangesW`. 

Now all that's left to be done is to run the monitor:

```ruby
monitor.run!
```

The `Monitor#run!` method blocks the process. Since monitors are thread-safe, you can run them in a thread if you don't want to block your main one:

```ruby
worker_thread = Thread.new { monitor.run! }

# The process won't block; it will continue with the next line of code...
```

When you are done with the monitor, don't forget to stop it. Here is a snippet to always stop the monitor when the ruby process exits:

```ruby
at_exit { monitor.stop }
```

### `WDM::Change`

The passed argument to the block is an instance of `WDM::Change`. This class has two methods: 

- `Change#path`: The absolute path to the change.
- `Change#type`: This can be one of the following values: `:added`, `:modified`, `:removed`, `:renamed_old_file` or `:renamed_new_file`.

## Compiling the extension for developers

Download the source, then run the following:

	$ bundle exec rake compile

To get debug messages, you need to enable them in the `global.h` file:

	#define WDM_DEBUG_ENABLED TRUE // This is disabled by default

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Added some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Author

[Maher Sallam](https://github.com/Maher4Ever)