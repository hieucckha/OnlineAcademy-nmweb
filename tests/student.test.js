import db from '../utils/db.js';
import watchListService from '../services/watch_list.service.js';
import enrollmentsService from '../services/enrollments.service.js';
import userService from '../services/user.service.js';
import coursesService from '../services/courses.service.js';

(async () => {
  // 1
  // const result = await watchListService.insert('1ed4ef15-1512-48d6-be79-3793867fcea4', 'a20f47ba-62e3-44e8-89e9-43a5e95d56ec')

  // 2
  // const result = await enrollmentsService.insert('7903d91d-f629-424a-9710-5bd5075839de', 'a20f47ba-62e3-44e8-89e9-43a5e95d56ec')

  // 3
  // const result = await userService.updateEmail('40e8e2a5-29b9-4be4-801d-8d0346036819', 'emailDuocUpdate@gmail.com');
  // const result = await userService.updateInfo('40e8e2a5-29b9-4be4-801d-8d0346036819', null, 'Meo', 'Beo', null, null);
  // const result = await userService.updatePassword('40e8e2a5-29b9-4be4-801d-8d0346036819', '123456', '123456')

  // 4
  // const result = await coursesService.getWatchList('1ed4ef15-1512-48d6-be79-3793867fcea4')
  // const result = await watchListService.delete('1ed4ef15-1512-48d6-be79-3793867fcea4', 'a20f47ba-62e3-44e8-89e9-43a5e95d56ec')

  // 5
  const result = await coursesService.getEnrollList(
    'eb751f9b-1c8f-41f3-a93b-0c284005dde1'
  );

  // 6
  // Check ở trên router
  // const result = await coursesService.getFullCourse('a20f47ba-62e3-44e8-89e9-43a5e95d56ec')

  // 7
  // const result = await enrollmentsService.isFeedback('5c47534d-75f4-4866-ba43-6aaee3a65aa5', 'a20f47ba-62e3-44e8-89e9-43a5e95d56ec')
  // const result = await enrollmentsService.ratingAndComment('5c47534d-75f4-4866-ba43-6aaee3a65aa5', 'a20f47ba-62e3-44e8-89e9-43a5e95d56ec', 3, 'Khoá học không thật sự hay lắm')

  console.log(result);
})();
