export default class User {
  constructor(
    userId,
    email,
    password,
    avatar,
    firstName,
    lastName,
    caption,
    biography,
    role,
    status
  ) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.firstName = firstName;
    this.lastName = lastName;
    this.caption = caption;
    this.biography = biography;
    this.role = role;
    this.status = status;
  }
}
