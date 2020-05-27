# source this file in bash or zsh to make
#  NETFOUNDRY_API_TOKEN 
# available to processes run in the same shell

_get_nf_token(){
    set -o pipefail
    [[ $# -ge 2 ]] || {
        echo "ERROR: send two params: client_id client_secret" >&2
        return 1
    }
    client_id=$1
    client_secret=$2
    env=${3:-production}
    access_token=$(
    http --check-status \
      POST https://netfoundry-${env}.auth0.com/oauth/token \
        "content-type: application/json" \
        "client_id=${client_id}" \
        "client_secret=${client_secret}" \
        "audience=https://gateway.${env}.netfoundry.io/" \
        "grant_type=client_credentials" | \
            jq -r .access_token
    ) || return 1
    echo ${access_token}
}

[[ ! -z ${NETFOUNDRY_CLIENT_ID:-} && ! -z ${NETFOUNDRY_CLIENT_SECRET:-} ]] || {
    echo "ERROR: permanent credential vars NETFOUNDRY_CLIENT_ID, NETFOUNDRY_CLIENT_SECRET are not assigned" >&2
    return 1
}

NETFOUNDRY_API_TOKEN=$(_get_nf_token ${NETFOUNDRY_CLIENT_ID} ${NETFOUNDRY_CLIENT_SECRET})

[[ ${NETFOUNDRY_API_TOKEN} =~ ^[A-Za-z0-9_=-]+\.[A-Za-z0-9_=-]+\.?[A-Za-z0-9_.+/=-]*$ ]] && {
    export NETFOUNDRY_API_TOKEN
} || {
    echo "ERROR: invalid JWT for NETFOUNDRY_API_TOKEN: '${NETFOUNDRY_API_TOKEN}'" >&2
    return 1
}

 
