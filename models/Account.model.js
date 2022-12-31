export default class User {
  constructor(
    userId,
    email,
    phone,
    type,
    firstName,
    lastName,
    avatar,
    caption,
    bio,
    website,
    language
  ) {
    this.Id = userId;
    this.Email = email;
    this.PhoneNumber = phone;
    this.Type = type;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.Avatar = avatar;
    this.Caption = caption;
    this.Bio = bio;
    this.Website = website;
    this.Language = language;
  },
  getInfo() {
    const Info = {
      Id: 1,
      FirstName: 'Bảo',
      LastName: 'Hoàng',
      Caption: '',
      Biography: '',
      Language: '',
      EmailContant: '',
      PhoneNumber: '',
      Avatar: '',
      Website: '',
      Language: '',
    };
    return Info;
  },
}
