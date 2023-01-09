import db from '../utils/db.js';
import watchListService from "../services/watch_list.service.js";
import enrollmentsService from "../services/enrollments.service.js";
import userService from "../services/user.service.js";
import coursesService from "../services/courses.service.js";
import categoryService from "../services/category.service.js";

(async () => {
    // 1
    // const result = await userService.getListStudent();

    // 2
    // const result = await userService.getListTeacher();

    // 3
    // const result = await userService.updateStatus('1ed4ef15-1512-48d6-be79-3793867fcea4', 0)

    // 4
    // const result = await categoryService.insert('7cc026f2-befe-4568-a8d5-3ad3c6787134', 'Day la con cua cate moi');
    // const result = await categoryService.update('7cc026f2-befe-4568-a8d5-3ad3c6787134', 'Ho Ho HO')
    // const result = await categoryService.delete('2768ad04-9b70-4b0c-8cf3-9ef5763cf5d2');

    // 5
    // const result = await coursesService.updateStatus('a20f47ba-62e3-44e8-89e9-43a5e95d56ec', 1)
    // const result = await coursesService.getAllCourses(1)
    // const result = await coursesService.getAllCourseCategory('9f3d296a-e139-4ba7-8c17-5cd34ae03c8d', 1)
    // const result = await coursesService.getAllCourseTeacher('d172436b-5020-4b34-8827-6ebd041d5474', 1)

    // console.log(result);
})();
