class Account {
  constructor({ displayName, id, emailAddress }) {
    this.id = id;
    this.displayName = displayName;
    this.emailAddress = emailAddress;
  }
}

module.exports = Account;
