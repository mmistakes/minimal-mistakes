# .github/workflows/your-workflow.yml

name: Your workflow
on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  job1:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2.3.4

      - name: Run actions/labeler
        uses: actions/labeler@v3
        with:
          repo-token: ${{ secrets.GITHUB_TOKEN }}
          
      - name: Lock Pull Request
        uses: sudo-bot/action-pull-request-lock@v1.0.5
        with:
          lock-note: "Repository is locked at this time until once the owner reviews your changes."
          lock-reason: "repo-lock"
          allow-merge: false
