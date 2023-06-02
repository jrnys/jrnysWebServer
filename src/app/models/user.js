class User {
  constructor(fullName, email, uuid) {
    // this.seqId = seqId;
    this.fullName = fullName;
    this.email = email;
    this.uuid = uuid;
    // this.createdAt = createdAt;
    // this.updatedAt = updatedAt;
  }

  static fields = ['seqId', 'fullName', 'email', 'uuid', 'createdAt', 'updatedAt'];
  static requiredFields = ['email'];
  static autoFields = ['createdAt', 'uuid', 'seqId']
  static autoLoadFields = ['updatedAt']

}

export default User;
