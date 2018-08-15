---
title: "Bitcoins and blockchains in Microsoft Dynamics CRM"
description: ""
category: 
tags: [Microsoft Dynamics CRM, Blockchain]
---


[Bitcoin](https://bitcoin.org/en/) is a digital payment form much like a typical currency except it's neither issued nor controlled by State. 
Bitcoin uses an immutable, distributed database or [blockchain](https://en.wikipedia.org/wiki/Blockchain_(database)) as a public ledger of all transactions in the currency.

Microsoft Dynamics CRM has supported multi-currency for eons. Adding Bitcoin as a custom currency can be done from `Settings>Business Administration>Currencies` and then clicking `New`:

At the point of writing, Bitcoin has an [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code of **XBT**.

![Adding Bitcoin currency to MSCRM](/assets/CRM_xbt.JPG)

Normally you'd end here for a new currency. Bitcoin has a few extra features that make it peculiar though.

Consider customer invoicing- typically you'd provide your banking details on the invoice. With Bitcoin you supply a payment location known as a [Bitcoin Address](https://en.bitcoin.it/wiki/Address).

You obtain the address from a [Bitcoin Wallet](https://bitcoin.org/en/choose-your-wallet). 
Microsoft Dynamics CRM having .NET at it's core, we can use the bitcoin library [NBitcoin](https://www.nuget.org/packages/NBitcoin) to generate an address.

{% highlight c# %}
using NBitcoin;
...

// Generate Private Key
Key privateKey = new Key();
BitcoinSecret secret = privateKey.GetBitcoinSecret(Network.TestNet);

// Get Bitcoin Address and Write to Console
// Share Address with Customers to start receiving payments.
address = secret.GetAddress();
Console.WriteLine("Address:\t{1}\nSecret:\t{0}",secret,address);
{% endhighlight %}

In short, bitcoin employs multiple cryptographic techniques to secure transactions, guaranteeing immutability of the blockchain, and allow users to sign and prove ownership on the network. This helps solve issues of trust between multiple parties that may or may not know each other in that no single person holds all the data and changing it is extremely hard.

A development blockchain, [TestNet](https://en.bitcoin.it/wiki/Testnet), is provided for testing while the `Main` network has the production blockchain. For more on NBitcoin you can check out [Nicolas Dorier](https://twitter.com/NicolasDorier)'s book: [Programming the Blockchain in C#](https://www.gitbook.com/book/programmingblockchain/programmingblockchain/details). You can get free TestNet bitcoins for development on any one of a number of `TestNet Faucets`.

After generating a bitcoin address we provide this on a copy of our invoice. We will also need to save our private key so that later we can transfer or spend the received bitcoin.

Because all transactions are on a public ledger it is possible for an interested party to deduce our balance and transaction history given that we use the same Bitcoin Address. For this reason the general guidance is to regenerate a new address per invoice- Kind of like changing your bank account each time, because using it makes it a matter of public record.

To query the blockchain like this on the .NET platform and in CRM we'd use a library like [QBitNinja](http://docs.qbitninja.apiary.io/#).
It can also be as simple as issuing a web request e.g.

`curl http://api.qbit.ninja/balances/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa`

The above queries the balances on the first ever Bitcoin Address **1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa** associated with the [genesis block](https://en.bitcoin.it/wiki/Genesis_block). Again this is available to the public but because your name is nowhere in the address we say you are pseudo-anonymous.

I hope I've piqued your interest on this subject. There is a whole lot more we can do with bitcoin and blockchains in particular within Microsoft Dynamics CRM which I'll try to share in coming posts.