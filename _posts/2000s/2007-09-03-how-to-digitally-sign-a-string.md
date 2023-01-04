---
title: How to digitally sign a string
tags: [c#, Signing]
---
<P>The first step is to create a pair of key(pulic/private):</P><PRE class=code>RSACryptoServiceProvider RSA = new RSACryptoServiceProvider();<BR>string publicKey = RSA.ToXmlString(false);<BR>string privateKey = RSA.ToXmlString(true);
</PRE>Private key is required to sign the string. Public key is required to verify if the sign is valid or not. 
<P>Sequence required to create a sign is:</P>
<UL>
<LI>select a private key</LI>
<LI>select an HASH algorithm to create one starting from the string to sign (you'll sign the hash, not the string)</LI>
<LI>create a sign starting from the hash</LI></UL>
<P>As shown bellow:</P><PRE class=code>RSACryptoServiceProvider RSA = new RSACryptoServiceProvider();<BR>RSA.FromXmlString(privateKey);<BR>RSAPKCS1SignatureFormatter RSAFormatter = new RSAPKCS1SignatureFormatter(RSA);<BR>RSAFormatter.SetHashAlgorithm("SHA1");<BR>SHA1Managed SHhash = new SHA1Managed();<BR>byte[] SignedHashValue = RSAFormatter.CreateSignature( SHhash.ComputeHash(new UnicodeEncoding().GetBytes(stringToBeSigned)));<BR>string signature = System.Convert.ToBase64String(SignedHashValue);
</PRE>Sequence of operations needed to verify a signature is instead: 
<UL>
<LI>select the proper public key</LI>
<LI>select the HASH algorithm to create one starting from the string to be verified</LI>
<LI>veirfy the sign&nbsp;</LI></UL>
<P>as shown below:</P><PRE class=code>RSACryptoServiceProvider RSA = new RSACryptoServiceProvider();<BR>RSA.FromXmlString(publicKey);<BR>RSAPKCS1SignatureDeformatter RSADeformatter = new RSAPKCS1SignatureDeformatter(RSA);<BR>RSADeformatter.SetHashAlgorithm("SHA1");<BR>SHA1Managed SHhash = new SHA1Managed();<BR>if (RSADeformatter.VerifySignature( <BR>&nbsp;SHhash.ComputeHash(new UnicodeEncoding().GetBytes(stringToBeVerified)),<BR>&nbsp;System.Convert.FromBase64String(signature))<BR>&nbsp;)<BR>&nbsp;{<BR>&nbsp;/// The signature is valid.<BR>&nbsp;}<BR>else<BR>&nbsp;{<BR>&nbsp;/// The signature is not valid.<BR>&nbsp;}
</PRE>
