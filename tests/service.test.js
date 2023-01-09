import userService from '../services/user.service.js';
import categoryService from '../services/category.service.js';

(async () => {
  // console.log(
  //   await userService.createStudent(
  //     'conpasslaconheo@gmail.com',
  //     '123456',
  //     'Hieu',
  //     'Nguyen'
  //   )
  // );
  const user = await userService.getByEmail('conpasslaconheo@gmail.com');
  console.log('user tu test###', user);
  await userService.updateInfo(
    user.userId,
    null,
    'Hieu',
    'Nguyen',
    'Day la toi',
    'Xin chao cac banj minh la Hieu'
  );

  console.log(
    'user sau update###',
    await userService.getByEmail('conpasslaconheo@gmail.com')
  );
})();
