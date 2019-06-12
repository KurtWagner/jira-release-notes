class Issue {
  constructor({ typeName, key, reporter, assignee, summary, host, versions }) {
    this.key = key;
    this.typeName = typeName;
    this.reporter = reporter;
    this.assignee = assignee;
    this.summary = summary;
    this.versions = versions;

    this.link = `https://${host}/browse/${key}`;
  }
}

module.exports = Issue;
