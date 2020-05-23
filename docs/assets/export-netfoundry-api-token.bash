# source this file in bash or zsh to make
#  NETFOUNDRY_API_TOKEN 
# available to processes run in the same shell

_get_nf_token(){
    [[ $# -eq 2 ]] || {
        echo "ERROR: send two params: client_id client_secret" >&2
        return 1
    }
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

[[ ! -z ${CLIENT_ID:-} && ! -z ${CLIENT_SECRET:-} ]] && {
    export NETFOUNDRY_API_TOKEN=$(_get_nf_token ${CLIENT_ID} ${CLIENT_SECRET})
} || {
    echo "ERROR: failed to export NETFOUNDRY_API_TOKEN. "\
         "Are permanent credential vars CLIENT_ID, CLIENT_SECRET assigned?" >&2
}

 