// 
// Bicep module with the container app definition for a Bun app.
//
@description('Name of the container app')
param name string

@description('Location of the container app')
param location string = resourceGroup().location

@description('Tags applied on the container app')
param tags object = {}

@description('Name of the container apps environment')
param containerAppsEnvironmentName string

@description('Name of the container registry')
param containerRegistryName string

@description('Service name (will be added as tag "azd-service-name")')
param serviceName string = 'bun'

@description('If true re-use existing Azure Container App')
param exists bool

@description('Name of the key vault to use for secret references')
param keyVaultName string

@description('Name of the managed identity to use for accessing secrets in the key vault')
param identityName string

module app 'core/host/container-app-upsert.bicep' = {
  name: '${serviceName}-container-app-module'
  params: {
    name: name
    containerMinReplicas: 0
    containerMaxReplicas: 3
    location: location
    tags: union(tags, { 'azd-service-name': serviceName })
    identityName: webIdentity.name
    exists: exists
    containerAppsEnvironmentName: containerAppsEnvironmentName
    containerRegistryName: containerRegistryName
    env: [
      {
        name: 'BUN_ENV'
        value: 'production'
      }
      {
        name: 'DATABASE_URL'
        secretRef: 'database-url'
      }
    ]
    secrets: [
      {
        name: 'database-url'
        keyVaultUrl: '${keyVault.properties.vaultUri}secrets/database-url'
        identity: webIdentity.id
      }
    ]
    targetPort: 3000
  }
}

resource keyVault 'Microsoft.KeyVault/vaults@2022-07-01' existing = {
  name: keyVaultName
}

resource webIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' existing = {
  name: identityName
}

output SERVICE_BUN_IDENTITY_PRINCIPAL_ID string = webIdentity.name
output SERVICE_BUN_NAME string = app.outputs.name
output SERVICE_BUN_URI string = app.outputs.uri
output SERVICE_BUN_IMAGE_NAME string = app.outputs.imageName
output AZURE_KEYVAULT_DB_URL_SECRET_NAME string = 'database-url'
