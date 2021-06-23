const ciFile = `
name: CD

on:
  push:
    branches: [ master ]

  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
       - name: AutoDeploy Request
         id: deploy
         uses: fjogeleit/http-request-action@master
         with:
           url: 'http://$replaceIPHere:6643/prod'
           method: 'POST'
           data: '{ "repository": "$repoHere", "first_time_commands": $firstHere, "commands": $commandsHere }'
       - name: Show Response
         run: echo \${{ steps.deploy.outputs.response }}
`

export default ciFile;
