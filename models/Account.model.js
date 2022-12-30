export default class User {
  constructor(
    userId,
    email,
    phone,
    password,
    type,
    firstName,
    lastName,
    avatar,
    caption,
    bio,
    website,
    language
  ) {
    this.userId = userId;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.type = type;
    this.firstName = firstName;
    this.lastName = lastName;
    this.avatar = avatar;
    this.caption = caption;
    this.bio = bio;
    this.website = website;
    this.language = language;
  }
  // getInfo() {
  //   const Info = {
  //     Id: 1,
  //     FirstName: 'Bảo',
  //     LastName: 'Hoàng',
  //     Caption: '',
  //     Biography: '',
  //     Language: '',
  //     EmailContant: '',
  //     PhoneNumber: '',
  //     Avatar: '',
  //     Website: '',
  //     Language: '',
  //   };
  //   return Info;
  // },
}
