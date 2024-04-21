#!/bin/bash
. $XDG_CONFIG_HOME/myscripts/tools.sh
in_git_repo=$(git rev-parse --is-inside-work-tree 2>/dev/null)
[ "$in_git_repo" != "true" ] && log_error "Not in a git worktree... aborting!" && exit 1
ROOT_DIR=$(git rev-parse --show-toplevel)

log_info "$ROOT_DIR"
secret_name=$(cat $ROOT_DIR/.env | grep AZURE_DB_SECRET_NAME | cut -d '=' -f2 | tr -d '"')

keyvault=$(cat $ROOT_DIR/.env | grep AZURE_KEY_VAULT | cut -d '=' -f2 | tr -d '"')
log_info "Fetching secret $secret_name from Azure Key Vault $keyvault"

KV_ID=$(az graph query -q "Resources | where type == 'microsoft.keyvault/vaults' | where name == '$keyvault'" | jq -r '.data[].id')

DATABASE_URL=$(az keyvault secret show --name $secret_name --vault-name $keyvault | jq -r '.value')

ENV_FILE=$ROOT_DIR/src/.env
log_info "Setting DATABASE_URL in $ENV_FILE"
# check if DATABASE_URL already exists in $ENV_FILE
# if not add it
# if it does, update it with sed command
if grep -q DATABASE_URL $ENV_FILE; then
	sed -i "/DATABASE_URL:/d" $ENV_FILE
	echo "DATABASE_URL: \"$DATABASE_URL\"" >>$ENV_FILE
else
	echo "DATABASE_URL: \"$DATABASE_URL\"" >>$ENV_FILE
fi
