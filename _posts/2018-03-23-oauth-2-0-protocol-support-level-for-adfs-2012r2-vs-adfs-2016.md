---
title: OAUTH 2.0 protocol support level for ADFS 2012R2 vs ADFS 2016
tags: [Active Directory Federation Server, ADFS, Mobile Development, Modern Authentication, OAUTH, Windows 2012R2, Windows 2016]
---
Active Directory Federation Services (ADFS) is a software component developed by Microsoft that can be installed on Windows Server operating systems to provide users with single sign-on access to systems and applications located across organizational boundaries. It uses a claims-based access control authorization model to maintain application security and implement federated identity.

OAuth 2.0 is an open standard created by the IETF for authorization and is documented by RFC 6749 (https://tools.ietf.org/html/rfc6749). Generally, OAuth provides to clients a "secure delegated access" to server resources on behalf of a resource owner. It specifies a process for resource owners to authorize third-party access to their server resources without sharing their credentials. Designed specifically to work with Hypertext Transfer Protocol (HTTP), OAuth essentially allows access tokens to be issued to third-party clients by an authorization server, with the approval of the resource owner. The third party then uses the access token to access the protected resources hosted by the resource server.

Starting from Windows Server 2012 R2 ADFS (Version 3.0) supports OAUTH 2.0 authorization protocol, and this post tries to clarify what this means. OAUTH 2.0 define various authorization grants, client and token types. ADFS started with the support of a subset of these, and  increased this support over time with Windows Server 2016 and his ADFS Version 4.0.
<h1>Authorization Grants</h1>
<table style="border-spacing: 24px;border-collapse: separate">
<tbody>
<tr>
<th>authorization grant type</th>
<th>ADFS 2012R2</th>
<th>ADFS 2016</th>
</tr>
<tr>
<td><a href="http://tools.ietf.org/html/rfc6749#section-4.1">Authorization code grant</a>

<span>used to obtain both access tokens and refresh tokens and is optimized for clients (i.e. mobile apps) able to interact with the resource owner's user-agent (typically a web browser) and capable of receiving incoming requests (via redirection) from the authorization server.

</span></td>
<td>yes</td>
<td>yes</td>
</tr>
<tr>
<td><a href="http://tools.ietf.org/html/rfc6749#section-4.2">Implicit Grant</a>

<span>is used to obtain access tokens (it does not support the issuance of refresh tokens) and is optimized for public clients known to operate a particular redirection URI.  These clients are typically implemented in a browser using a scripting language such as JavaScript.
</span></td>
<td>no</td>
<td>yes</td>
</tr>
<tr>
<td><a href="http://tools.ietf.org/html/rfc6749#section-4.3">Resource owner password credential</a></td>
<td>no</td>
<td>yes</td>
</tr>
<tr>
<td><a href="http://tools.ietf.org/html/rfc6749#section-4.4">Client credential grant</a></td>
<td>no</td>
<td><a href="https://blogs.technet.microsoft.com/cloudpfe/2017/10/16/oauth-2-0-confidential-clients-and-active-directory-federation-services-on-windows-server-2016/">yes</a></td>
</tr>
</tbody>
</table>
<h1>Client Types</h1>
<table style="border-spacing: 24px;border-collapse: separate">
<tbody>
<tr>
<th>Client Types</th>
<th>ADFS 2012R2</th>
<th>ADFS 2016</th>
</tr>
<tr>
<td><a href="http://tools.ietf.org/html/rfc6749#section-2.1">Public Client</a></td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td><a href="http://tools.ietf.org/html/rfc6749#section-2.1">Confidential Client</a></td>
<td>No</td>
<td>Yes</td>
</tr>
</tbody>
</table>
Oauth confidential client authentication methods:
<ul class="unordered">
 	<li>Symmetric (shared secret / password)</li>
 	<li>Asymmetric keys</li>
 	<li>Windows Integrated Authentication (WIA)</li>
</ul>
<h1>Token Types</h1>
<table style="border-spacing: 24px;border-collapse: separate">
<tbody>
<tr>
<th>Token Type</th>
<th>ADFS 2012 R2</th>
<th>ADFS 2016</th>
</tr>
<tr>
<td><b><span style="font-family: Segoe UI Bold">id_token</span></b>

<span> A JWT token used to represent the identity of the user. The 'aud' or audience claim of the id_token matches the client ID of the native or server application</span></td>
<td>no</td>
<td><a href="https://blogs.technet.microsoft.com/piameruo/2017/10/22/custom_idtoken/">yes</a></td>
</tr>
<tr>
<td><a href="https://tools.ietf.org/html/rfc6749#page-10"><b><span style="font-family: Segoe UI Bold">access_token</span></b></a>

<span>A JWT token used in Oauth and OpenID connect scenarios and intended to be consumed by the resource. The 'aud' or audience claim of this token must match the identifier of the resource or Web API.</span></td>
<td>yes</td>
<td>yes</td>
</tr>
<tr>
<td><a href="https://tools.ietf.org/html/rfc6749#page-10"><b><span style="font-family: Segoe UI Bold">refresh_token</span></b></a>

<span>This token is submitted in place of collecting user credentials to provide a single sign on experience. This token is both issued and consumed by AD FS, and is not readable by clients or resources.</span></td>
<td>yes</td>
<td>yes</td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<span style="float: none;background-color: transparent;color: #333333;font-family: 'Segoe UI',Tahoma,Arial,'Helvetica Neue',Helvetica,Sans-Serif;font-size: 14px;font-style: normal;font-variant: normal;font-weight: 400;letter-spacing: normal;text-align: justify;text-decoration: none;text-indent: 0px">ADFS issues access tokens and refresh tokens in the JWT (JSON Web Token) format in response to successful authorization requests using the OAuth 2.0 protocol. ADFS does not issue SAML tokens over the OAuth 2.0 authorization protocol.</span>
<h1>Further information</h1>
<ul>
 	<li> <a href="https://technet.microsoft.com/ru-ru/library/mt617220(v=ws.11)">https://technet.microsoft.com/ru-ru/library/mt617220(v=ws.11)</a></li>
 	<li> <a href="https://blogs.technet.microsoft.com/maheshu/2015/04/28/oauth-2-0-support-in-adfs-on-windows-server-2012-r2/">https://blogs.technet.microsoft.com/maheshu/2015/04/28/oauth-2-0-support-in-adfs-on-windows-server-2012-r2/</a></li>
 	<li> <a href="https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/overview/ad-fs-scenarios-for-developers">https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/overview/ad-fs-scenarios-for-developers</a></li>
 	<li> <a href="https://medium.com/@robert.broeckelmann/saml2-vs-jwt-understanding-oauth2-4abde9e7ec8b">https://medium.com/@robert.broeckelmann/saml2-vs-jwt-understanding-oauth2-4abde9e7ec8b</a></li>
</ul>
