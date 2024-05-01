#!/bin/bash

# Check if the environment is set to production
# consequence: the local IP address will not be whitelisted on Azure postgresql instance

ENVIRONNEMENT=$(azd env get-values | grep "AZURE_ENVIRONMENT" | cut -d "=" -f 2)
if [ "$ENVIRONNEMENT" != "prod" ]; then
	# MY_PUBLIC_IP=$(curl -s ifconfig.me)
	MY_PUBLIC_IP="37.65.42.246"
	azd env set LOCAL_IP_ADDRESS $MY_PUBLIC_IP
fi
