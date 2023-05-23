on:
  pull_request:
    types: [opened, edited, synchronize]

jobs:
  auto_label:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Setup Node
      uses: actions/setup-node@v2
      with:
        node-version: "14"

    - name: Labeler
      uses: actions/labeler@v3
      with:
        configuration-path: .github/labeler.yml
        repo-token: ${{ secrets.GITHUB_TOKEN }}

    - name: Lock Pull Request
      uses: sudo-bot/action-pull-request-lock@v1.0.5
      if: github.event.action == 'opened'
      with:
        lock-reason: 'This Pull Request is locked.'
        issue-number: ${{ github.event.number }}
        repo-token: ${{ secrets.MY_REPO_TOKEN_BLOG }}
