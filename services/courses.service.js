import { v4 as uuidv4 } from 'uuid';

import db from '../utils/db.js';
import Course from '../models/course.model';
import sectionService from './section.service.js';

export default {
  // 3-4
  getInfoHot: async () => {
    try {
      const sql = `
    SELECT course.course_id, course.course_title, course.image, course.create_by, course.rating, course.num_rating, course.price, course.discount
    FROM courses course
      join (
        SELECT course_id, SUM(num_view) as view
        FROM view_number
        WHERE (current_date - course.date >= 0) and (current_date - course.date <= 7)
        GROUP BY course_id
      ) as numview on numview.course_id = course.course_id
    ORDER BY numview.view DESC
    LIMIT 4
    `;

      const result = await db.many(sql);

      return result;
    } catch (err) {
      console.log(err);
    }
    return null;
  },
  // 10
  getInfoMostWatch: async () => {
    try {
      const sql = `
    SELECT course.course_id, course.course_title, course.image, course.create_by, course.rating, course.num_rating, course.price, course.discount
    FROM courses course
      join (
        SELECT course_id, SUM(num_view) as view
        FROM view_number
        GROUP BY course_id
      ) as numview on numview.course_id = course.course_id
    ORDER BY view.num_view DESC
    LIMIT 10
  `;

      const result = await db.many(sql);

      return result;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  // 10
  getInfoNewest: async () => {
    try {
      const sql = `
    SELECT course.course_id, course.course_title, course.image, course.create_by, course.rating, course.num_rating, course.price, course.discount
    FROM courses course
    ORDER BY course.date desc
    LIMIT 10
    `;

      const result = await db.many(sql);

      return result;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  // 10
  getInfoMostEnroll: async () => {
    try {
      const sql = `
      SELECT course_id, course_title, image, create_by, rating, num_rating, price, discount
      FROM courses
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
      const sql = `
        SELECT course_id, course_title, image, b_description, create_by, rating, num_rating, price, discount
        FROM courses
        WHERE category_id =$1
        LIMIT $3 OFFSET $2
      `;

      const COURSE_PER_PAGE = 10;
      const offset = (page - 1) * COURSE_PER_PAGE;

      const result = await db.manyOrNone(sql, [
        categoryId,
        offset,
        COURSE_PER_PAGE,
      ]);

      if (result.length != 0) {
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
  getFullCourse: async (courseId) => {
    try {
      const sql = `
        SELECT course_id, course_title, category_id, image, b_description, description, price, discount, status, rating, num_enroll, num_rating, create_by, create_at, update_at
        FROM courses
        WHERE course_id = $1
      `;

      const result = await db.one(sql, [courseId]);

      const course = new Course(
        result.course_id,
        result.course_title,
        result.category_id,
        result.image,
        result.b_description,
        result.description,
        result.price,
        result.discount,
        result.status,
        result.rating,
        result.num_enroll,
        result.num_rating,
        result.create_by,
        result.create_at,
        result.update_at
      );

      course.listSection = await sectionService.getAllFullSection(courseId);

      return course;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  getByCreateBy: async (createBy) => {
    try {
      const sql = `
        SELECT course_id, course_title, category_id, image, b_description, status, rating, num_enroll, num_rating
        FROM courses
        WHERE create_by = $1
        ORDER BY create_at desc
    `;

      const result = await db.manyOrNone(sql, [createBy]);

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

          courses.push(tmp);
        }

        return courses;
      }
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  getWatchList: async (userId) => {
    try {
      const sql = `
        SELECT co.course_id, co.course_title, co.category_id, co.image, co.b_description, co.status, co.rating, co.num_enroll, co.num_rating
        FROM watch_list wl JOIN courses co on wl.course_id = co.course_id
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
        SELECT co.course_id, co.course_title, co.category_id, co.image, er.enroll_date, er.status
        FROM enrollments er JOIN courses co on er.course_id = co.course_id
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

          courses.push(tmp);
        }

        return courses;
      }
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  insert: async (
    courseTitle,
    categoryId,
    image,
    bDescription,
    description,
    price,
    discount,
    status,
    createBy
  ) => {
    try {
      const sql = `
      SELECT select fn_insert_course($1,$2, $3, $4, $5, $6, $7, $8, $9, $10) as courseId;
      `;

      const result = await db.one(sql, [
        uuidv4(),
        courseTitle,
        categoryId,
        image,
        bDescription,
        description,
        price,
        discount,
        status,
        createBy,
      ]);

      return result.course.Id;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  update: async (
    courseId,
    courseTitle,
    image,
    bDescription,
    description,
    price,
    discount
  ) => {
    try {
      const sql = `
    UPDATE courses
    SET course_title=$2, category_id=$3, image=$4, b_description=$5, description=$6, price=$7, discount=$9, update_at=current_timestamp
    WHERE course_id=$1
    RETURNING course_id`;

      const result = await db.one(sql, [
        courseId,
        courseTitle,
        image,
        bDescription,
        description,
        price,
        discount,
      ]);

      return result;
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
    WHERE course_id=$1
    RETURNING num_enroll`;

      const result = await db.one(sql, [courseId]);

      return result.num_enroll;
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
      WHERE course_id=$1
      RETURNING num_rating`;

      const result = await db.one(sql, [courseId]);

      return result.num_rating;
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
      WHERE course_id=$1
      RETURNING num_rating`;

      const result = await db.one(sql, [courseId]);

      return result.;
    } catch (err) {
      console.log(err);
    }
    return null;
  },
};


