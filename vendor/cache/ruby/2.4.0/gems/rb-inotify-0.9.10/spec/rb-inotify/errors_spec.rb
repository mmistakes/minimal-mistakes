require 'spec_helper'

describe INotify do
  describe "QueueOverflowError" do
    it "exists" do
      expect(INotify::QueueOverflowError).to be_truthy
    end
  end
end
