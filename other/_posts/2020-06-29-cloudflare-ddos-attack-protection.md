---
title: "How to protect your website with Cloudflare's DDoS attack protection for free"
classes: wide
---

Many websites get DDOS (Denial-of-service attacks) from outside sources, in order to protect your website against this kind of attacks you have to use some kind of protection, if you want a free solution for this Cloudflare is one of the best options out there.

## Pricing

Cloudflare is billed monthly per website, and has 4 plans at the moment: Free, Pro, Business, Enterprise

The features and prices can be seen on: https://www.cloudflare.com/plans/ (ao: I've been told by non-Cloudflare sources that Enterprise pricing starts at $5000/mo)

DDoS attack mitigation is available starting from Free plan:

> All Cloudflare plans offer unlimited and unmetered mitigation of distributed denial-of-service (DDoS) attacks, regardless of the size of the attack, at no extra cost. No penalty for spikes in the network traffic associated with a distributed attack.


## Operation Level and security considerations

Cloudflare requires your nameservers (on the domain you want to put behind them) to their NS servers, and requires you to place the DDoS protected records behind their proxy. Cloudflare acts on L7, and also optionally L4 if you use [Spectrum](https://www.cloudflare.com/products/cloudflare-spectrum/) (only available on paid plans, with strict traffic and concurrent session limitations on any plan but Enterprise).

This has several implications, such as the fact that all requests come from Cloudflare IPs instead of actual user IPs ([with actual user IPs provided in headers](https://support.cloudflare.com/hc/en-us/sections/200805497-Restoring-Visitor-IPs)). Cloudflare also uses its' own TLS certificate for HTTPS (which cannot be replaced without a paid plan), and provides access to users over IPv6 even if you only have an A record (and to v4 users if you only have an AAAA record). Cloudflare applies caching by default on static assets to improve load times ([under 512MB](https://support.cloudflare.com/hc/en-us/articles/200172516-Understanding-Cloudflare-s-CDN) on any plan but Enterprise). There's however other arbitrary limitations such as file upload limits being limited to 100MB on free and pro plans ([full list here](https://support.cloudflare.com/hc/en-us/articles/200172516)).

<!--more-->


It is strongly recommended upon moving to Cloudflare to:

- Deny access from all IPs on your servers (such as on nginx) but Cloudflare ([IP prefix list here](https://www.cloudflare.com/ips/))
- If you're genuinely worried about DDoSes: Change the IP you use for hosting things if it was ever without Cloudflare as your origin IP is still vulnerable to non-L7 DDoS (or even L7 DDoS if you don't do the step above this).

Cloudflare DDoS protection detects and blocks attacks at layer 3-4-7 on their servers.

## Security Levels

There are various security levels for cloudflare ddos protection which you can choose at dashboard, 

> Essentially off: Challenges only the most grievous offenders
> Low: Challenges only the most threatening visitors
> Medium: Challenges both moderate threat visitors and the most threatening visitors
> High: Challenges all visitors that have exhibited threatening behavior within the last 14 days
> I’m Under Attack!: Should only be used if your website is under a DDoS attack
> Visitors will receive an interstitial page while we analyze their traffic and behavior to make sure they are a legitimate human visitor trying to access your website


> By default, Cloudflare’s firewall security is set to Medium. This offers some protection against visitors who are rated as a moderate threat by presenting them with a challenge page before allowing them to continue to your site. 

### How to change security level or activate Under Attack Mode

In Cloudflare website, enter dashboard, pick the website, go to Firewall, click "Settings" button on the right and change Security Level, this setting can also be changed or fetched via Cloudflare API.

Full API documentation for security setting can be found here: https://api.cloudflare.com/#zone-settings-get-security-level-setting

If you activate under attack mode as a DDoS protection your visitors will see a interstitial page which contains a Captcha challenge as such:

![Captcha challenge](https://image.prntscr.com/image/YQexw20MTxShol5T-_H2Rg.jpeg)

## Alternatives to Cloudflare DDoS protection

- Voxility DDoS protection
- Akamai Web Application Protector


***Special Thanks to***  : https://ave.zone/

## Resources 

- https://www.cloudflare.com/ddos/
- https://www.digitalocean.com/community/tutorials/how-to-mitigate-ddos-attacks-against-your-website-with-cloudflare