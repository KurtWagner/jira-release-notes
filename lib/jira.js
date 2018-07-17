const rp = require("request-promise");

const logger = require("./logger");
const Issue = require("./model/issue");
const Account = require("./model/account");
const Version = require("./model/version");

const METHOD = { GET: "GET", POST: "POST" };

class Jira {
  constructor({ host, username, password }) {
    if (!host) {
      throw new Error("Missing JIRA host");
    }
    if (!username) {
      throw new Error("Missing JIRA username");
    }
    if (!password) {
      throw new Error("Missing JIRA password");
    }

    this._host = normaliseHost(host);
    this._defaultOptions = {
      auth: {
        user: username,
        pass: password
      },
      json: true
    };
    logger.info(`Connecting to jira host "${this._host}"`);
  }

  getReleasedIssues({ versionName }) {
    const endpoint = "rest/api/2/search";
    const jql = `fixVersion = "${versionName}" AND type NOT IN (Sub-task)`;

    logger.info(`Getting tickets for version "${versionName}"`);
    logger.info(`\tUsing JQL: ${jql}`);
    logger.info(`\tFrom endpoint "${endpoint}"`);

    return this._request(METHOD.GET, endpoint, { jql });
  }

  _request(method, endpoint, body) {
    return rp(
      Object.assign(
        { method, url: this._url(endpoint), qs: body },
        this._defaultOptions
      )
    ).then(response => {
      const issues = response.issues.map(issue => {
        const reporter = makeAccount(issue.fields.reporter);
        const assignee = makeAccount(issue.fields.assignee);

        return new Issue({
          key: issue.key,
          typeName: issue.fields.issuetype.name,
          reporter,
          assignee,
          summary: issue.fields.summary,
          host: this._host,
          versions: issue.fields.fixVersions.map(version => {
            return new Version({
              name: version.name,
              description: version.description
            });
          })
        });
      });

      return issues;
    });
  }

  _url(endpoint) {
    return `https://${this._host}/${endpoint}`;
  }
}

module.exports = {
  connect
};

function connect(options) {
  return new Jira(options);
}

function normaliseHost(host) {
  return host.replace(/^\w\:\:\/\//, "").replace(/\/+$/, "");
}

function makeAccount(accountDetails) {
  return accountDetails
    ? new Account({
        emailAddress: accountDetails.emailAddress,
        id: accountDetails.accountId,
        displayName: accountDetails.displayName
      })
    : null;
}
