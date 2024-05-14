# familinks azd bun htmx app stater

### How to run
```bash

# deploy the application
azd up

```
*Remarks:*
- DB migrations and seeding will be run automatically on deployment with a postprovision script. Migrations will be run from the local developpment environment, therefore the db firewall must be configured to allow the local public ip address (automatically done when the value of azd env variable AZURE_ENVIRONMENT is not "prod")
- Once migrations are run, var APP_DB_READY will be set to true and the application will be started
- to remove all azure resoueces, run `azd down --purge`


### Manual Database initialization
```bash
# Connect to a running container instance
. ./.env
az containerapp exec --name $SERVICE_BUN_NAME --resource-group $AZURE_RESOURCE_GROUP_NAME

# run database migrations
bunx prisma migrate deploy

# run seeding script
bunx prisma db seed

```

