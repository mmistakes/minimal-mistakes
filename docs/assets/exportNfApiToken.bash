# source this file in bash or zsh to make
#  NETFOUNDRY_API_TOKEN 
# available to processes run in the same shell

getNfApiToken(){
    client_id=$1
    client_secret=$2
    access_token=$(
    http POST https://netfoundry-production.auth0.com/oauth/token \
        "content-type: application/json" \
        "client_id=${client_id}" \
        "client_secret=${client_secret}" \
        "audience=https://gateway.production.netfoundry.io/" \
        "grant_type=client_credentials" | \
            jq -r .access_token
    )
    echo ${access_token}
}

export NETFOUNDRY_API_TOKEN=$(getNfApiToken ${CLIENT_ID} ${CLIENT_SECRET})

 