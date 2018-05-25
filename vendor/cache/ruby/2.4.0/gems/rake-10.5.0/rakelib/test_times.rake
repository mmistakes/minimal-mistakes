module TestTimes
  def self.run(test_results, limit=0)
    limit = limit.nonzero? || 10
    tests = []
    test_results.split(/\n/).each do |line|
      if line =~ /^(.+?#[^:]+): ([0-9.]+) s: \.$/
        tests << [$1, $2.to_f, line]
      end
    end

    puts "#{limit} Slowest tests"
    puts tests.sort_by { |item|
      item[1]
    }.reverse[0...limit].map { |item|
      "%6.3f: %-s\n" % [item[1], item[0]]
    }
  end
end

namespace :test do
  desc "Find the slowest unit tests"
  task :times, [:limit] do |t, args|
    TestTimes.run `rake test:units TESTOPTS='--verbose'`, args.limit.to_i
  end
end
