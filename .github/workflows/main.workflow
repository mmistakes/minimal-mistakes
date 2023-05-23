on: pull_request

jobs:
  # Checkout code from repository
  first-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: peter-evans/create-pull-request@v3.5.0

  # Lock the pull request if changes are pushed
  second-job:
    needs: first-job
    runs-on: ubuntu-latest
    steps:
      - uses: sudo-bot/action-pull-request-lock@v1.0.5

