# Jira Release Notes

A command line tool that pulls and prints notes about a given jira release. This was thrown together one weekend for personal use and to experiment with the JIRA api

:warning: It does _not_ support pagination (so max 50 issues) and has no automated tests. If you want to submit a PR for this, please go for it :heart:

This tool ignores sub-tasks and epics.

```
$ npm -g install jira-release-notes
$ jira-release-notes [options]
```

## Options

Command line options

### -h, --host

The JIRA hostname. e.g, "_yourname_.jira.com".

### -u, --username

The JIRA username to log in.

### -p, --password

The JIRA password for the given username. Please use an [API Token](https://developer.atlassian.com/cloud/jira/platform/jira-rest-api-basic-authentication/#getting-your-api-token) instead of your actual password. Also please ensure you take appropriate measures to hide this detail from any output or logs :see_no_evil: .

### -f, --filter-version

The name of the release version you want to create notes for. We'll compare this to the "Fix Version".

### -v, --verbose

Be noisy with output. Sometimes useful for debugging :loudspeaker:.

### -f, --format

How should we print the result. I use for slack but you're welcome to extend in other formats if you want to contribute. Can either be:

* `text` (default)
* `slack-hook` e.g, pipe straight to a [slack inbound hook](https://api.slack.com/incoming-webhooks)
```
 ... --format slack-hook | curl \
 -XPOST \
 -H 'Content-type: application/json' \
 -d @- \ https://hooks.slack.com/your/webhook/url
 ```
