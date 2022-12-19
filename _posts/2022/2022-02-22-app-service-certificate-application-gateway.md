---
title: Azure App Service Certificate
date: 2022-02-22 10:00
tags: [Azure, Application Gateway, Certificates Management, IaaS, Powershell, az CLI, App Service Certificate]

excerpt: "notes on how to use App Svc Certificates"
header:
  overlay_image: https://live.staticflickr.com/65535/51810822593_fb4f9a7872_h.jpg
  caption: "Photo credit: [**nicola since 1972**](https://www.flickr.com/photos/15216811@N06/51811446245)"
---

Azure [App Service Certificate](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.CertificateRegistration%2FcertificateOrders) can be also be used for other Azure services and not just App Service Web App. The list includes Virtual Machines and Azure Application Gateway.

In order to use the certificate outside Azure, you can export it from the Azure Portal.

Simply select:
* Settings
* Export Certificate
* click Key Vault
* click on the current version and **download as certificate** button. (the script in the link below does not work correctly so you need to do it in this way).

The .pfx created above will not include the chain certificates. Services such ad Azure App Services expect uploaded certificates to have all chain certificates included in the pfx file. In order for the chain certificates to be part of the pfx file, you must install the exported certificate on your computer. In this step **make sure you have marked the certificate as exportable**.

  * <https://azure.github.io/AppService/2017/02/24/Creating-a-local-PFX-copy-of-App-Service-Certificate.html>

It is possible to use App Cervice Certificate on Application Gateway, [here there is the setup guide](https://docs.microsoft.com/en-us/azure/application-gateway/key-vault-certs#supported-certificates). 

Things to be noted:

* App Service Certificate puts the certificate under **Key Vault** > **Secrets** section
* Application Gateway portal UI allows only to select a certificate available under **Key Vault** > **Certificates Section**
* in order to use a certificate in **secrets** section **az cli** or **powershell** must be used (see link above)
* if you configure Application Gateway to use a certificate under Secrets **you can benefit of the autorenew feature of the Azure App Service Certificate**.

Here insted you can find a guide to manually renew an Application Gateway Certificate: <https://docs.microsoft.com/en-us/azure/application-gateway/renew-certificates>