---
title: Azure AD OAuth client credential flow with custom certificate walktrough
date: 2022-06-01 10:00
tags: [Azure, Azure Active Directory, OAuth, Postman, certificate, security]
excerpt: "In this walktrough I show how to use a certificate to request an access token to Azure Active Directory, using the OAuth 2.0 client credential flow"

header:
  overlay_image: https://live.staticflickr.com/65535/52074972176_d36ce1a7cc_h.jpg
  caption: "Photo credit: [**nicola since 1972**](https://www.flickr.com/photos/15216811@N06/52074972176)"
---

You can use the OAuth 2.0 client credentials grant specified in RFC 6749, to access web-hosted resources by using the identity of an application. This type of grant is commonly used for server-to-server interactions that must run in the background, without immediate interaction with a user.

The OAuth 2.0 client credentials grant flow permits a web service (confidential client) to use its own credentials, instead of impersonating a user, to authenticate when calling another web service. For a higher level of assurance, the Microsoft identity platform also allows the calling service to authenticate using a certificate or federated credential instead of a shared secret.

In this walktrough I show how to **use a certificate to request an access token to Azure Active Directory**, using the OAuth 2.0 client credential flow. As client I will use  a custom c# dotnet 6 application and MSAL Library. 

Alternatively, you can use any other library able [to compute an assertion](https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-certificate-credentials#assertion-format), and [post it](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow#second-case-access-token-request-with-a-certificate) to Azure AD.


# 01 - App registration
On your [Azure Active Directory](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis), create an app registration:
* Open https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps
* click [New Registration]

use the following parameters:

* Name: `my-sample-app-registration`
* Supported account Types: `Accounts in this organizational directory only`
* click [Register]

# 02 - Create and upload a certificate in Azure AD

You can use Azure to create a self signed certificate. 

* Open an instance of [Azure Key Vault](https://docs.microsoft.com/en-us/azure/key-vault/general/basic-concepts) or create a new one if needed.
* From Azure Key vault open Certificates blade and click on [Generate or Import]

use the following parameters
* Method: `Generate`
* Certificate Name: `my-sample-certificate`
* Type of CA: `Self-signed Certificate`
* Subject: `CN=my-sample-common-name`
* Valid Period: `12 months`
* Type:`PKCS #12`
* Click [Create]

When certificate creation is completed:

1. Download certificate in PFX/PEM format (with private key).
2. Download certigicate in .CER format (without private key).

> NOTE: A .pfx file includes both the **public and private key** for the associated certificate. A .cer file only has the **public key**, it can be used to verify tokens or client authentication requests.


Now go to the App Registration just created and click on `Certificates and Secrets`, upload the certificate **.CER** just created.

The result will be something like:

| Thumbprint | description | start date | expires | id |
|---|---|---|---|---|
|4DDASE... | my-sample-certificate | ... | ... | 1aa986a ... | 


# 03 create .Net 6 client application

Create a directory on your machine, and put **.PFX** file downloaded previously in it. 

Create the following `client-certificate-test.csproj` file:

```
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <RootNamespace>client_certificate_test</RootNamespace>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Identity.Web.Certificate" Version="1.25.0" />
    <PackageReference Include="Microsoft.Identity.Web.TokenCache" Version="1.25.0" />
  </ItemGroup>
    
</Project>
```

create also the following `program.cs` file:

```
using Microsoft.Identity.Client;
using Microsoft.Identity.Web;
using System;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace daemon_console
{
    // For more information see https://aka.ms/msal-net-client-credentials
    class Program
    {
        static void Main(string[] args)
        {
            try
            {   RunAsync().GetAwaiter().GetResult();   }
            catch (Exception ex)
            {   Console.WriteLine(ex.Message);  }
        }

        private static string certificateFullPath = "C:\\temp\\client-certificate-test\\nicold-my-sample-certificate-20220614.pfx"; // Replace with your certificate path
        private static string applicationID="ace7a10d-aaaa-4a01-8663-1440b6b78cb9"; // replace with your application ID
        private static string authority="https://login.microsoftonline.com/dac2b1d5-5420-4fad-889e-1280ffdc8003/"; // replace with your AAD authority

        private static async Task RunAsync()
        {
            ICertificateLoader certificateLoader = new DefaultCertificateLoader();

            // full path Certificate File
            var myCertificate = X509Certificate2.CreateFromCertFile(certificateFullPath);
            X509Certificate2 myCertificate2 = new X509Certificate2(myCertificate);

            var app = ConfidentialClientApplicationBuilder.Create(applicationID) 
                .WithCertificate(myCertificate2)
                .WithAuthority(new Uri(authority)) // Tenant ID
                .Build();

            app.AddInMemoryTokenCache();

            // With client credentials flows the scopes is ALWAYS of the shape "resource/.default", as the 
            // application permissions need to be set statically (in the portal or by PowerShell), and then granted by
            // a tenant administrator. 
            string[] scopes = new string[] { "https://graph.microsoft.com/.default" }; // Generates a scope -> "https://graph.microsoft.com/.default"
            //string[] scopes = new string[] { "api://ace7a10d-aaaa-4a01-8663-1440b6b78cb9/.default" }; // custom API on same tenant

            AuthenticationResult result = null;
            try
            {
                result = await app.AcquireTokenForClient(scopes).ExecuteAsync();
                Console.WriteLine("Token acquired");
                Console.WriteLine("Token: " + result.AccessToken);
            }
            catch (MsalServiceException ex) when (ex.Message.Contains("AADSTS70011"))
            {
                // Invalid scope. The scope has to be of the form "https://resourceurl/.default"
                // Mitigation: change the scope to be as expected
                Console.WriteLine("Scope provided is not supported");
            }
        }
    }
}
```

> Note. Update this code with your ApplicationId, certificate file path and your authority URI 

Execute this application from Visual Studio Code. If everything works you will receive an output similar to:

```
Token acquired
Token: eyJ0eXAiOiJKV1QiLCJub25jZSI6IkpXNDFfcFF1Y1EzYkhfZVl6NmVBT0RYSHNpNEJQWjdQT0RwMTB2by12MWsiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kYWMyYjFkNS01NDIwLTRmYWQtODg5ZS0xMjgwZmZkYzgwMDMvIiwiaWF0IjoxNjU1MjI5MjAxLCJuYmYiOjE2NTUyMjkyMDEsImV4cCI6MTY1NTIzMzEwMSwiYWlvIjoiRTJaZ1lLaStuWnA3NmQ0TDdRc0Y2Zzk1TGF3NUFBPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJteS1zYW1wbGUtYXBwLXJlZ2lzdHJhdGlvbiIsImFwcGlkIjoiYWNlN2ExMGQtYWFhYS00YTAxLTg2NjMtMTQ0MGI2Yjc4Y2I5IiwiYXBwaWRhY3IiOiIyIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZGFjMmIxZDUtNTQyMC00ZmFkLTg4OWUtMTI4MGZmZGM4MDAzLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiNDZjOTRiNTctNjI0MC00OTAyLWI2MGEtZDg1OGViYWQ3YmFhIiwicmgiOiIwLkFRd0ExYkhDMmlCVXJVLUluaEtBXzl5QUF3TUFBQUFBQUFBQXdBQUFBQUFBQUFBTUFBQS4iLCJzdWIiOiI0NmM5NGI1Ny02MjQwLTQ5MDItYjYwYS1kODU4ZWJhZDdiYWEiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiRVUiLCJ0aWQiOiJkYWMyYjFkNS01NDIwLTRmYWQtODg5ZS0xMjgwZmZkYzgwMDMiLCJ1dGkiOiJsS2Ixa1hyMnVVYTE1MmNKMWFZakFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyIwOTk3YTFkMC0wZDFkLTRhY2ItYjQwOC1kNWNhNzMxMjFlOTAiXSwieG1zX3RjZHQiOjEzODE3ODg5MTZ9.fGZvr6hFSgdjQrdVmbemxS96qEHM8d5HAWRDBj94IlgAcLWtDjk6hnVCOrOcWeU3Ng1egH7VN8bQ4yHxRmH7KzaYwt0nm4MSNaAhSMyta6LFsbGEzgI5oh873kUd0l0UoAFgvnkWK5CIQris8xxm7yW5fSlXfYbkCogyDsJoF2091KpQcHOqk7fWS9mvLQkDd84mwQkwAFoak0kD4N8S0nxS0aSeW2Jsn4dlGzaVdWbzA3uQ8lVUKiI6QZStAloMSsJPHUJd5LZK4_csH4zmTguPu9F8NWNIAZCxrANlLqtpHUdFX3DWMM-0hbUOd9nqWphPwDpSL8Mws4X1QbbdYQ
```

copy encoded Token and paste it in https://jwt.ms. You should see something similar to the following:

![jwt.ms](\../assets/post/2022/jwt-token-sample.png)

# More information
* Microsoft Identity OAuth 2.0 client credentials flow: https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-client-creds-grant-flow 
* Create a certificate in Azure Key Vault: https://docs.microsoft.com/en-us/azure/key-vault/certificates/quick-create-portal 
* Certificate Credential, Assertion Format: https://docs.microsoft.com/en-us/azure/active-directory/develop/active-directory-certificate-credentials 
* MSAL: https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-overview
* A .NET Core daemon console application using MSAL.NET to acquire tokens for resources: https://github.com/Azure-Samples/active-directory-dotnetcore-daemon-v2 
* .NET 6: https://docs.microsoft.com/it-it/dotnet/fundamentals/ 
* Visual Studio Code: https://code.visualstudio.com/ 
