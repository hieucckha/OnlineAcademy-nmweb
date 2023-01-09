import {v4 as uuidv4} from 'uuid';

import db from '../utils/db.js';
import Course from '../models/course.model.js';
import sectionService from './section.service.js';
import enrollmentsService from "./enrollments.service.js";

export default {
    // 3-4
    getInfoHot: async () => {
        try {
            const sql = `
                SELECT course.course_id,
                       course.course_title,
                       course.image,
                       course.create_by,
                       course.rating,
                       course.num_rating,
                       course.price,
                       course.discount
                FROM courses course
                         JOIN (SELECT course_id, SUM(num_view) AS view
                               FROM view_number view
                               WHERE (current_date - view.date >= 0)
                                 and (current_date - view.date <= 7)
                               GROUP BY course_id)
                    AS numview ON numview.course_id = course.course_id
                WHERE course.status != 2
                ORDER BY numview.view DESC
                LIMIT 4
            `;

            const result = await db.many(sql);

            return result;
        } catch (err) {
            console.log(err);
        }
        return null;
    }, // 10
    getInfoMostWatch: async () => {
        try {
            const sql = `
                SELECT course.course_id,
                       course.course_title,
                       course.image,
                       course.create_by,
                       course.rating,
                       course.num_rating,
                       course.price,
                       course.discount
                FROM courses course
                         join (SELECT course_id, SUM(num_view) as view
                               FROM view_number
                               GROUP BY course_id) as numview on numview.course_id = course.course_id
                WHERE course.status != 2
                ORDER BY numview.view DESC
                LIMIT 10
            `;

            const result = await db.many(sql);

            return result;
        } catch (err) {
            console.log(err);
        }

        return null;
    }, // 10
    getInfoNewest: async () => {
        try {
            const sql = `
                SELECT course.course_id,
                       course.course_title,
                       course.image,
                       course.create_by,
                       course.rating,
                       course.num_rating,
                       course.price,
                       course.discount
                FROM courses course
                WHERE course.status != 2
                ORDER BY course.create_at desc
                LIMIT 10
            `;

            const result = await db.many(sql);

            return result;
        } catch (err) {
            console.log(err);
        }

        return null;
    }, // 10
    getInfoMostEnroll: async () => {
        try {
            const sql = `
                SELECT course_id,
                       course_title,
                       image,
                       create_by,
                       rating,
                       num_rating,
                       price,
                       discount
                FROM courses
                WHERE status != 2
                ORDER BY num_enroll desc
                LIMIT 10
            `;

            const result = await db.many(sql);

            return result;
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    // 10 course per page
    // page begin in 1
    getInfoByCategory: async (categoryId, page) => {
        try {
            const checkIfParentSql = `
                SELECT category_id
                FROM categories
                WHERE category_parent = $1
            `;

            const children = await db.manyOrNone(checkIfParentSql, [categoryId]);

            let sql = '';

            if (children.length === 0) {
                sql = `
                    SELECT course_id,
                           course_title,
                           image,
                           b_description,
                           create_by,
                           rating,
                           num_rating,
                           price,
                           discount
                    FROM courses
                    WHERE category_id = $1
                      AND status != 2
                    LIMIT $3 OFFSET $2
                `;
            } else {
                sql = `
                    SELECT course_id,
                           course_title,
                           image,
                           b_description,
                           create_by,
                           rating,
                           num_rating,
                           price,
                           discount
                    FROM courses
                    WHERE status != 2
                      AND category_id IN (SELECT category_id
                                          FROM categories
                                          WHERE category_parent = $1)
                    LIMIT $3 OFFSET $2
                `;
            }
            const COURSE_PER_PAGE = 10;
            const offset = (page - 1) * COURSE_PER_PAGE;

            const result = await db.manyOrNone(sql, [categoryId, offset, COURSE_PER_PAGE,]);

            if (result.length !== 0) {
                const listCourse = [];

                result.forEach((course) => {
                    const tmp = new Course();

                    tmp.courseId = course.course_id;
                    tmp.title = course.course_title;
                    tmp.image = course.image;
                    tmp.bDescription = course.b_description;
                    tmp.createBy = course.create_by;
                    tmp.numRating = course.num_rating;
                    tmp.price = course.price;
                    tmp.discount = course.discount;

                    listCourse.push(tmp);
                });

                return listCourse;
            }
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    searchCourse: async (keyWord, page) => {
        try {
            const sql = `
                SELECT course_id,
                       course_title,
                       image,
                       b_description,
                       create_by,
                       rating,
                       num_rating,
                       price,
                       discount
                FROM courses
                WHERE status != 2
                  AND textsearchable_index_col @@ to_tsquery($1)
                ORDER BY num_enroll desc
                LIMIT $3 OFFSET $2`;

            const key = keyWord.split(' ').join(' & ');

            const COURSE_PER_PAGE = 10;
            const offset = (page - 1) * COURSE_PER_PAGE;

            const result = await db.manyOrNone(sql, [key, offset, COURSE_PER_PAGE]);

            if (result.length != 0) {
                const listCourse = [];

                for (let course of result) {
                    const tmp = new Course();

                    tmp.courseId = course.course_id;
                    tmp.title = course.course_title;
                    tmp.image = course.image;
                    tmp.bDescription = course.b_description;
                    tmp.createBy = course.create_by;
                    tmp.numRating = course.num_rating;
                    tmp.price = course.price;
                    tmp.discount = course.discount;

                    listCourse.push(tmp);
                }

                return listCourse;
            }
        } catch (err) {
            console.log(err);
        }
        return null;
    },
    searchCourseRatingDesc: async (keyWord, page) => {
        try {
            const sql = `
                SELECT course_id,
                       course_title,
                       image,
                       b_description,
                       create_by,
                       rating,
                       num_rating,
                       price,
                       discount
                FROM courses
                WHERE status != 2
                  AND textsearchable_index_col @@ to_tsquery($1)
                ORDER BY rating desc
                LIMIT $3 OFFSET $2`;

            const key = keyWord.split(' ').join(' & ');

            const COURSE_PER_PAGE = 10;
            const offset = (page - 1) * COURSE_PER_PAGE;

            const result = await db.manyOrNone(sql, [key, offset, COURSE_PER_PAGE]);

            if (result.length != 0) {
                const listCourse = [];

                for (let course of result) {
                    const tmp = new Course();

                    tmp.courseId = course.course_id;
                    tmp.title = course.course_title;
                    tmp.image = course.image;
                    tmp.bDescription = course.b_description;
                    tmp.createBy = course.create_by;
                    tmp.numRating = course.num_rating;
                    tmp.price = course.price;
                    tmp.discount = course.discount;

                    listCourse.push(tmp);
                }

                return listCourse;
            }
        } catch (err) {
            console.log(err);
        }
        return null;
    },
    searchCoursePriceAsc: async (keyWord, page) => {
        try {
            const sql = `
                SELECT course_id,
                       course_title,
                       image,
                       b_description,
                       create_by,
                       rating,
                       num_rating,
                       price,
                       discount
                FROM courses
                WHERE status != 2
                  AND textsearchable_index_col @@ to_tsquery($1)
                ORDER BY price ASC
                LIMIT $3 OFFSET $2`;

            const key = keyWord.split(' ').join(' & ');

            const COURSE_PER_PAGE = 10;
            const offset = (page - 1) * COURSE_PER_PAGE;

            const result = await db.manyOrNone(sql, [key, offset, COURSE_PER_PAGE]);

            if (result.length != 0) {
                const listCourse = [];

                for (let course of result) {
                    const tmp = new Course();

                    tmp.courseId = course.course_id;
                    tmp.title = course.course_title;
                    tmp.image = course.image;
                    tmp.bDescription = course.b_description;
                    tmp.createBy = course.create_by;
                    tmp.numRating = course.num_rating;
                    tmp.price = course.price;
                    tmp.discount = course.discount;

                    listCourse.push(tmp);
                }

                return listCourse;
            }
        } catch (err) {
            console.log(err);
        }
        return null;
    },
    getFullCourse: async (courseId) => {
        try {
            const sql = `
                SELECT course_id,
                       course_title,
                       category_id,
                       image,
                       b_description,
                       description,
                       price,
                       discount,
                       status,
                       rating,
                       num_enroll,
                       num_rating,
                       create_by,
                       create_at,
                       update_at
                FROM courses
                WHERE course_id = $1
            `;

            const result = await db.one(sql, [courseId]);

            const course = new Course(result.course_id, result.course_title, result.category_id, result.image, result.b_description, result.description, result.price, result.discount, result.status, result.rating, result.num_enroll, result.num_rating, result.create_by, result.create_at, result.update_at);

            course.sectionList = await sectionService.getAllFullSection(courseId);
            course.feedbackList = await enrollmentsService.getListFeedback(courseId);

            return course;
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getWatchList: async (userId) => {
        try {
            const sql = `
                SELECT co.*
                FROM watch_list wl
                         JOIN courses co on wl.course_id = co.course_id
                WHERE wl.user_id = $1
            `;

            const result = await db.manyOrNone(sql, [userId]);

            if (result.length != 0) {
                const courses = [];

                for (let course of result) {
                    const tmp = new Course();

                    tmp.courseId = course.course_id;
                    tmp.title = course.course_title;
                    tmp.categoryId = course.category_id;
                    tmp.image = course.image;
                    tmp.bDescription = course.b_description;
                    tmp.status = course.status;
                    tmp.rating = course.rating;
                    tmp.numEnroll = course.num_enroll;
                    tmp.numRating = course.num_rating;
                    tmp.price = course.price;
                    tmp.discount = course.discount;

                    courses.push(tmp);
                }

                return courses;
            }
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getEnrollList: async (userId) => {
        try {
            const sql = `
                SELECT co.*, er.enroll_date, er.status
                FROM enrollments er
                         JOIN courses co on er.course_id = co.course_id
                WHERE er.user_id = $1
            `;

            const result = await db.manyOrNone(sql, [userId]);

            if (result.length !== 0) {
                const courses = [];

                for (let course of result) {
                    const tmp = new Course();

                    tmp.courseId = course.course_id;
                    tmp.title = course.course_title;
                    tmp.categoryId = course.category_id;
                    tmp.image = course.image;
                    tmp.bDescription = course.b_description;
                    tmp.status = course.status;
                    tmp.rating = course.rating;
                    tmp.numEnroll = course.num_enroll;
                    tmp.numRating = course.num_rating;
                    tmp.price = course.price;
                    tmp.discount = course.discount;

                    courses.push(tmp);
                }

                return courses;
            }
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getCourseById: async (courseId) => {
        try {
            const sql = `
                SELECT *
                FROM courses
                WHERE course_id = $1
            `;

            const result = await db.manyOrNone(sql, [courseId]);

            if (result.length != 0) {
                const courses = [];

                for (let course of result) {
                    const tmp = new Course();

                    tmp.courseId = course.course_id;
                    tmp.title = course.course_title;
                    tmp.categoryId = course.category_id;
                    tmp.image = course.image;
                    tmp.bDescription = course.b_description;
                    tmp.description = course.description;
                    tmp.status = course.status;
                    tmp.rating = course.rating;
                    tmp.numEnroll = course.num_enroll;
                    tmp.numRating = course.num_rating;
                    tmp.price = course.price;
                    tmp.discount = course.discount;

                    courses.push(tmp);
                }

                return courses;
            }
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    insert: async (courseTitle, categoryId, image, bDescription, description, price, discount, status, createBy) => {
        try {
            const sql = `
                SELECT fn_insert_course($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) as courseId;
            `;

            const result = await db.one(sql, [uuidv4(), courseTitle, categoryId, image, bDescription, description, price, discount, status, createBy,]);

            return result;
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    update: async (courseId, courseTitle, image, bDescription, description, price, discount) => {
        try {
            const sql = `
                UPDATE courses
                SET course_title  = $2,
                    category_id   = $3,
                    image         = $4,
                    b_description = $5,
                    description   = $6,
                    price         = $7,
                    discount      = $9,
                    update_at     = current_timestamp
                WHERE course_id = $1
                RETURNING course_id
            `;

            const result = await db.one(sql, [courseId, courseTitle, image, bDescription, description, price, discount]);

            return result.course_id;
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    updateNumEnroll: async (courseId) => {
        try {
            const sql = `
                UPDATE courses
                set num_enroll = num_enroll + 1
                WHERE course_id = $1
                RETURNING course_id, num_enroll
            `;

            const result = await db.one(sql, [courseId]);

            return result;
        } catch (err) {
            console.log(err);
        }
        return null;
    },
    updateNumRating: async (courseId) => {
        try {
            const sql = `
                UPDATE courses
                set num_rating = num_rating + 1
                WHERE course_id = $1
                RETURNING course_id`;

            const result = await db.one(sql, [courseId]);

            return result.course_id;
        } catch (err) {
            console.log(err);
        }
        return null;
    },
    updateRating: async (courseId) => {
        try {
            const sql = `
                UPDATE courses
                SET rating = (SELECT AVG(enroll.rating)
                              FROM enrollments as enroll
                              WHERE enroll.course_id = $1)
                WHERE course_id = $1
                RETURNING course_id`;

            const result = await db.one(sql, [courseId]);

            return result.course_id;
        } catch (err) {
            console.log(err);
        }
        return null;
    },
    getByCreateBy: async (createBy) => {
        try {
            const sql = `
                SELECT course_id,
                       course_title,
                       category_id,
                       image,
                       b_description,
                       status,
                       rating,
                       num_enroll,
                       num_rating
                FROM courses
                WHERE create_by = $1
                ORDER BY create_at desc
            `;

            const result = await db.manyOrNone(sql, [createBy]);

            if (result.length !== 0) {
                const courses = [];

                for (let course of result) {
                    const tmp = new Course();

                    tmp.courseId = course.course_id;
                    tmp.title = course.course_title;
                    tmp.categoryId = course.category_id;
                    tmp.image = course.image;
                    tmp.bDescription = course.b_description;
                    tmp.status = course.status;
                    tmp.rating = course.rating;
                    tmp.numEnroll = course.num_enroll;
                    tmp.numRating = course.num_rating;

                    courses.push(tmp);
                }

                return courses;
            }
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getAllCourses: async (page) => {
        const sql = `
            SELECT course_id,
                   course_title,
                   category_id,
                   image,
                   b_description,
                   description,
                   price,
                   discount,
                   status,
                   rating,
                   num_enroll,
                   num_rating,
                   create_by,
                   create_at,
                   update_at
            FROM courses
            LIMIT $2 OFFSET $1
        `
        const COURSE_PER_PAGE = 10;
        const offset = (page - 1) * COURSE_PER_PAGE;

        const result = await db.manyOrNone(sql, [offset, COURSE_PER_PAGE]);
        if (result.length !== 0) {
            const listCourse = [];

            for (let course of result)
                listCourse.push(new Course(course.course_id, course.course_title, course.category_id, course.image, course.b_description, course.description, course.price, course.discount, course.status, course.rating, course.num_enroll, course.num_rating, course.create_by, course.create_at, course.update_at));

            return listCourse;
        }
    },
    getAllCourseTeacher: async (createBy, page) => {
        try {
            const sql = `
                SELECT course_id,
                       course_title,
                       category_id,
                       image,
                       b_description,
                       description,
                       price,
                       discount,
                       status,
                       rating,
                       num_enroll,
                       num_rating,
                       create_by,
                       create_at,
                       update_at
                FROM courses
                WHERE create_by = $1
                ORDER BY create_at desc
                LIMIT $3 OFFSET $2
            `;

            const COURSE_PER_PAGE = 10;
            const offset = (page - 1) * COURSE_PER_PAGE;

            const result = await db.manyOrNone(sql, [createBy, offset, COURSE_PER_PAGE]);

            if (result.length !== 0) {
                const courses = [];

                for (let course of result) {
                    courses.push(new Course(course.course_id, course.course_title, course.category_id, course.image, course.b_description, course.description, course.price, course.discount, course.status, course.rating, course.num_enroll, course.num_rating, course.create_by, course.create_at, course.update_at));
                }

                return courses;
            }
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getAllCourseCategory: async (categoryId, page) => {
        try {
            const checkIfParentSql = `
                SELECT category_id
                FROM categories
                WHERE category_parent = $1
            `;

            const children = await db.manyOrNone(checkIfParentSql, [categoryId]);

            let sql = '';

            if (children.length === 0) {
                sql = `
                    SELECT course_id,
                           course_title,
                           category_id,
                           image,
                           b_description,
                           description,
                           price,
                           discount,
                           status,
                           rating,
                           num_enroll,
                           num_rating,
                           create_by,
                           create_at,
                           update_at
                    FROM courses
                    WHERE category_id = $1
                    LIMIT $2 OFFSET $1
                `;
            } else {
                sql = `
                    SELECT course_id,
                           course_title,
                           category_id,
                           image,
                           b_description,
                           description,
                           price,
                           discount,
                           status,
                           rating,
                           num_enroll,
                           num_rating,
                           create_by,
                           create_at,
                           update_at
                    FROM courses
                    WHERE category_id IN (SELECT category_id
                                          FROM categories
                                          WHERE category_parent = $1)
                    LIMIT $3 OFFSET $2
                `;
            }

            const COURSE_PER_PAGE = 10;
            const offset = (page - 1) * COURSE_PER_PAGE;

            const result = await db.manyOrNone(sql, [categoryId, offset, COURSE_PER_PAGE]);

            if (result.length !== 0) {
                const courses = [];

                for (let course of result) {
                    courses.push(new Course(course.course_id, course.course_title, course.category_id, course.image, course.b_description, course.description, course.price, course.discount, course.status, course.rating, course.num_enroll, course.num_rating, course.create_by, course.create_at, course.update_at));
                }

                return courses;
            }
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    updateStatus: async (courseId, status) => {
        try {
            const sql = `
                UPDATE courses
                SET status = $2
                WHERE course_id = $1
                RETURNING course_id`;

            const result = await db.one(sql, [courseId, status]);

            return result.course_id;
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    insertDateNumView: async (courseId, date) => {
        try {
            const sql = `
                INSERT INTO view_number (course_id, date, num_view)
                VALUES ($1, $2, 0)
                RETURNING course_id, date
            `;

            const result = await db.one(sql, [courseId, date]);

            return result;
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    updateNumView: async (courseId, date) => {
        try {
            const sql = `
                UPDATE view_number
                SET num_view = num_view + 1
                WHERE course_id = $1
                  AND date = $2
                RETURNING course_id, num_view
            `;

            const result = await db.one(sql, [courseId, date]);

            return result;
        } catch (err) {
            console.log(err);
        }
        return null;
    }

}