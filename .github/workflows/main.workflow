 generate:
    runs-on: ubuntu-latest
    steps:
    - id: setup
      run: |
        if ! [[ -z "${{ secrets.GO_TOKEN }}" ]]; then
           echo ::set-output has_token=true
        else
           echo ::set-output has_token=false
        fi
        jq -nc '{"state": "pending", "context": "go tests"}' | \
        curl -sL -X POST -d @- \
            -H "Content-Type: application/json" \
            -H "Authorization: token ${{ secrets.GITHUB_TOKEN }}" \
            "${{ github.event.pull_request.statuses_url }}"
      if: github.event_name == 'pull_request'
    - uses: actions/checkout@v2
      if: github.event_name == 'push' && steps.setup.outputs.has_token == 'true'
      with:
        fetch-depth: 0
        token: '${{ secrets.GO_TOKEN }}'
    - uses: actions/checkout@v2
      if: github.event_name == 'pull_request' || steps.setup.outputs.has_token != 'true'
      with:
        fetch-depth: 0
    - uses: actions/setup-go@v2
