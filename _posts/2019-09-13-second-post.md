---
layout: post
title: "Welcome to the 2nd blog"
---

**Hello world**, this is my 2nd blog post. The header fields are transmitted after the request line (in case of a request HTTP message) or the response line (in case of a response HTTP message), which is the first line of a message. Header fields are colon-separated key-value pairs in clear-text string format, terminated by a carriage return (CR) and line feed (LF) character sequence. The end of the header section is indicated by an empty field(line), resulting in the transmission of two consecutive CR-LF pairs. In the past, long lines could be folded into multiple lines; continuation lines are indicated by the presence of a space (SP) or horizontal tab (HT) as the first character on the next line. This folding is now deprecated.[1]

Field names
A core set of fields is standardized by the Internet Engineering Task Force (IETF) in RFCs 7230, 7231, 7232, 7233, 7234, and 7235. The permanent registry of header fields and repository of provisional registrations are maintained by the IANA. Additional field names and permissible values may be defined by each application.

Header field names are case-insensitive[2]. This is in contrast to HTTP method names (GET, POST, etc.), which are case-sensitive[3][4].

HTTP/2 makes some restrictions on specific header fields (see below).

Non-standard header fields were conventionally marked by prefixing the field name with X- but this convention was deprecated in June 2012 because of the inconveniences it caused when non-standard fields became standard.[5] An earlier restriction on use of Downgraded- was lifted in March 2013.[6]