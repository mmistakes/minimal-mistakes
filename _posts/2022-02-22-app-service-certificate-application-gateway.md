---
title: Azure App Service Certificate tips and how to use itwith Application Gateway
date: 2022-01-05 10:00
tags: [Azure, Application Gateway, Certificates Management, IaaS, Powershell, az CLI, App Service Certificate]

excerpt: "notes on how to use App Svc Certificates"
header:
  overlay_image: https://live.staticflickr.com/65535/51810822593_fb4f9a7872_h.jpg
  caption: "Photo credit: [**nicola since 1972**](https://www.flickr.com/photos/15216811@N06/51811446245)"
---

Azure [App Service Certificate](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.CertificateRegistration%2FcertificateOrders) can be used also for other Azure services and not just App Service Web App. The list include Virtual Machines and Azure Application Gateway.

In order to use the certificate outside Azure, you can export it from the UI.
Just select 
* Settings
* Export Certificate
* Open Key Vault Select
* click on current version and **download as certificate button**. (the script in the link below do not work properly so do it in this way instead).

The pfx created by the above command will not include certificates from the chain. Services like Azure App Services expect the certificates that are being uploaded to have all the certificates in the chain included as part of the pfx file. To get the certificates of the chain to be part of the pfx, you will need to install the exported certificate on your machine. In this step **Make sure you mark the certificate as exportable**.

  * https://azure.github.io/AppService/2017/02/24/Creating-a-local-PFX-copy-of-App-Service-Certificate.html

It is possible to use App Cervice Certificate on Application Gateway, [here there is the setup guide](https://docs.microsoft.com/en-us/azure/application-gateway/key-vault-certs#supported-certificates). 

Things to be noted:

* App Service Certificate puts the certificate under **Key Vault** > **Secrets** section
* Application Gateway portal UI allows only to select a certificate available under **Key Vault** > **Certificates Section**
* in order to use a certificate in **secrets** section **az cli** or **powershell** must be used (see link above)
* if you configure Application Gateway to use a certificate under Secrets **you can benefit of the autorenew feature of the Azure App Service Certificate**.

Here insted you can find a guide to manually renew an Application Gateway Certificate: https://docs.microsoft.com/en-us/azure/application-gateway/renew-certificates