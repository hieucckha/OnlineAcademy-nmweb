export default class User {
  constructor(
    userId,
    email,
    password,
    phone,
    type,
    firstName,
    lastName,
    avatar,
    caption,
    bio,
    website
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
