---
layout: post
title: "Installing Postfix with Auth SASL and LDAP Support on FreeBSD"
date: 2014-07-01 10:00:00
categories: sysadmin
---

Install packages using FreeBSD port.
### 1. Install postfix
	# Options for postfix-2.11.0,1
    _OPTIONS_READ=postfix-2.11.0,1
    _FILE_COMPLETE_OPTIONS_LIST=BDB CDB INST_BASE LDAP_SASL LMDB MYSQL NIS OPENLDAP PCRE PGSQL SASL2 SPF SQLITE TEST TLS VDA DOVECOT DOVECOT2 SASLKRB5 SASLKMIT
    OPTIONS_FILE_SET+=BDB
    OPTIONS_FILE_SET+=CDB
    OPTIONS_FILE_UNSET+=INST_BASE
    OPTIONS_FILE_SET+=LDAP_SASL
    OPTIONS_FILE_UNSET+=LMDB
    OPTIONS_FILE_UNSET+=MYSQL
    OPTIONS_FILE_UNSET+=NIS
    OPTIONS_FILE_SET+=OPENLDAP
    OPTIONS_FILE_SET+=PCRE
    OPTIONS_FILE_UNSET+=PGSQL
    OPTIONS_FILE_SET+=SASL2
    OPTIONS_FILE_UNSET+=SPF
    OPTIONS_FILE_UNSET+=SQLITE
    OPTIONS_FILE_SET+=TEST
    OPTIONS_FILE_SET+=TLS
    OPTIONS_FILE_UNSET+=VDA
    OPTIONS_FILE_UNSET+=DOVECOT
    OPTIONS_FILE_UNSET+=DOVECOT2
    OPTIONS_FILE_UNSET+=SASLKRB5
    OPTIONS_FILE_UNSET+=SASLKMIT

### 2. install openldap
    # Options for openldap-client-2.4.38
    _OPTIONS_READ=openldap-client-2.4.38
    _FILE_COMPLETE_OPTIONS_LIST=FETCH
    OPTIONS_FILE_UNSET+=FETCH

### 3. install cyrus-sasl2
    # Options for cyrus-sasl-2.1.26_4
    _OPTIONS_READ=cyrus-sasl-2.1.26_4
    _FILE_COMPLETE_OPTIONS_LIST=ALWAYSTRUE AUTHDAEMOND KEEP_DB_OPEN  OBSOLETE_CRAM_ATTR BDB MYSQL PGSQL SQLITE2 SQLITE3 CRAM DIGEST LOGIN NTLM OTP PLAIN SCRAM
    OPTIONS_FILE_UNSET+=ALWAYSTRUE
    OPTIONS_FILE_SET+=AUTHDAEMOND
    OPTIONS_FILE_UNSET+=KEEP_DB_OPEN
    OPTIONS_FILE_SET+=OBSOLETE_CRAM_ATTR
    OPTIONS_FILE_UNSET+=BDB
    OPTIONS_FILE_UNSET+=MYSQL
    OPTIONS_FILE_UNSET+=PGSQL
    OPTIONS_FILE_UNSET+=SQLITE2
    OPTIONS_FILE_UNSET+=SQLITE3
    OPTIONS_FILE_SET+=CRAM
    OPTIONS_FILE_SET+=DIGEST
    OPTIONS_FILE_SET+=LOGIN
    OPTIONS_FILE_SET+=NTLM
    OPTIONS_FILE_SET+=OTP
    OPTIONS_FILE_SET+=PLAIN
    OPTIONS_FILE_SET+=SCRAM

### 4. install cyrus-sasl2-saslauthd
    # Options for cyrus-sasl-saslauthd-2.1.26
    _OPTIONS_READ=cyrus-sasl-saslauthd-2.1.26
    _FILE_COMPLETE_OPTIONS_LIST=BDB HTTPFORM OPENLDAP
    OPTIONS_FILE_SET+=BDB
    OPTIONS_FILE_SET+=HTTPFORM
    OPTIONS_FILE_SET+=OPENLDAP

### 5. install postfwd
    # Options for postfix-postfwd-1.32_1
    _OPTIONS_READ=postfix-postfwd-1.32_1
    _FILE_COMPLETE_OPTIONS_LIST=DOCS EXAMPLES POSTFWD2
    OPTIONS_FILE_SET+=DOCS
    OPTIONS_FILE_SET+=EXAMPLES
    OPTIONS_FILE_UNSET+=POSTFWD2

### 6. configure /usr/local/lib/sasl2/smtpd.conf
    log_level: 3
    pwcheck_method: saslauthd
    mech_list: PLAIN LOGIN

### 7. configure /usr/local/etc/saslauthd.conf
    ldap_servers:
    ldap_bind_dn:
    ldap_bind_pw:
    ldap_search_base:
    ldap_auth_method: ssha
    ldap_time_limit: 4
    ldap_filter:

### 8. configure /usr/local/etc/postfix/main.cf
    mtpd_sasl_auth_enable = yes
    smtpd_sasl_local_domain =
    smtpd_sasl_authenticated_header = yes
    broken_sasl_auth_clients = yes
    smtpd_sasl_path = smtpd
    smtp_sasl_type = cyrus
    smtpd_sasl_security_options = noanonymous

    smtpd_recipient_restrictions =
    permit_mynetworks,
    permit_sasl_authenticated,
    reject_unauth_destination

### 9. configure /usr/local/etc/postfwd.conf
    id=RULE001
     sasl_username=~/^(\S+)$/
     action=rcpt(sasl_username/200/3600/DEFER Too much emails for $$sasl_username)


### 10. configure /etc/rc.conf
    postfix_enable="YES"
    saslauthd_enable="YES"
    saslauthd_flags="-a ldap"
    postfwd_enable="YES"


Reference: http://ashterix.blogspot.com/2008/10/freebsd-postfix-sasl-openldap.html
