import db from '../utils/db.js';
import coursesService from "../services/courses.service.js";
import userService from "../services/user.service.js";

(async () => {
    // 1
    // const result = await coursesService.getInfoHot();
    // const result = await coursesService.getInfoMostWatch();
    // const result = await coursesService.getInfoNewest();
    // const result = await coursesService.getInfoMostEnroll();

    // 2
    // const result = await coursesService.getInfoByCategory('9f3d296a-e139-4ba7-8c17-5cd34ae03c8d', 1);
    // const result = await coursesService.getInfoByCategory('2768ad04-9b70-4b0c-8cf3-9ef5763cf5d2', 1);

    // 3
    // const result = await coursesService.searchCourse('develop', 1);
    // const result = await coursesService.searchCourseRatingDesc('develop', 1);
    // const result = await coursesService.searchCoursePriceAsc('develop', 1);

    // 4
    // const result = await coursesService.getFullCourse('9a3fe19c-eec1-4a02-b19e-55115b3a3c67')

    // 5
    // const result = await userService.isAuth('conpasslaconheo@gmail.com', '123456');

    // 6
    // const isEmailExists = await userService.isEmailExist('daylaemailtest@gmail.com');
    // if (!isEmailExists) {
    //     const result = await userService.createStudent('daylaemailtest@gmail.com', '123456', 'Hieu', 'Nguyen')
    //     console.log(result);
    // }

    // console.log(result)
})();
