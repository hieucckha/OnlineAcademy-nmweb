import userService from '../services/user.service.js';
import categoryService from '../services/category.service.js';
import { faker } from '@faker-js/faker';

(async () => {
  const stu1 = await userService.createStudent(
    'conpasslaconheo@gmail.com',
    '123456',
    'Hieu',
    'Nguyen'
  );
  const stu2 = await userService.createStudent(
    'vothanhsuong123@gmail.com',
    '123456',
    'Suong',
    'Vo'
  );

  for (let i = 0; i < 3; ++i) {
    await userService.createTeacher(
      faker.internet.email(),
      '123456',
      faker.name.firstName(faker.name.sex()),
      faker.name.lastName()
    );
  }
  for (let i = 0; i < 3; ++i) {
    await userService.createTeacher(
      faker.internet.email(),
      '123456',
      faker.name.firstName(faker.name.sex()),
      faker.name.lastName()
    );
  }
})();
