import userService from '../services/user.service.js';
import categoryService from '../services/category.service.js';
import { faker } from '@faker-js/faker';

(async () => {
  console.log(await userService.isEmailExist('conpasslaconheo@gmail.com'));
})();
