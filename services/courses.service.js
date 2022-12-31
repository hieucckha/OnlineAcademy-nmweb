import { v4 as uuidv4 } from 'uuid';

import db from '../utils/db.js';
import Course from '../models/Course.model';
import Section from '../models/Section.model';
import Lecture from '../models/Lecture.model';

export default {
  getLecture: async (sectionId) => {
    try {
      const lectureSql = `
      SELECT *
      FROM lectures
      WHERE section_id = $1`;

      const result = await db.many(lectureSql, [sectionId]);
      return result;
    } catch (err) {}
    return null;
  },
  get: async (id) => {
    try {
      const infoCourse = `
        SELECT *
        FROM courses
        WHERE course_id = $1`;
      const sectionSql = `
        SELECT *
        FROM sections
        WHERE course_id = $1
        ORDER BY section_order`;
      const lectureSql = `
        SELECT *
        FROM lectures
        WHERE section_id = $1
        ORDER BY lecture_order`;

      const resultCourse = await db.one(infoCourse, [id]);
      const resultSections = await db.manyOrNone(sectionSql, [id]);

      const sections = [];
      for (let section of resultSections) {
        const tmpSec = new Section();
        tmpSec.sectionId = section.section_id;
        tmpSec.sectionTitle = section.section_title;
        tmpSec.sectionOrder = section.order;
        tmpSec.course_id = section.course_id;

        const resultLectures = await db.many(lectureSql, [section.section_id]);
        const lectures = [];
        for (let lecture of resultLectures) {
          const tmpLec = new Lecture();
          tmpLec.lectureId = lecture.lecture_id;
          tmpLec.sectionId = lecture.section_id;
          tmpLec.lectureTitle = lecture.lectureTitle;
          tmpLec.lectureOrder = lecture.lecture_order;
          tmpLec.description = lecture.description;
          tmpLec.source = lecture.source;
          tmpLec.length = lecture.length;
          tmpLec.isPreview = lecture.is_preview;

          lectures.push(tmpLec);
        }

        sections.push(tmpSec);
      }

      return new Course(
        resultCourse.course_id,
        resultCourse.course_title,
        resultCourse.category_id,
        resultCourse.image,
        resultCourse.b_description,
        resultCourse.description,
        resultCourse.price,
        resultCourse.discount,
        resultCourse.status,
        resultCourse.rating,
        resultCourse.num_enroll,
        resultCourse.num_rating,
        resultCourse.create_by,
        resultCourse.create_at,
        resultCourse.update_at,
        sections
      );
    } catch (err) {
      // Multi or none record
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

      const result = await db.many(sql, [createBy]);
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
    } catch (err) {
      // None record
    }
    return null;
  },
  getWatchList: async (userId) => {
    try {
      const sql = `
    SELECT co.course_id, co.course_title, co.category_id, co.image, co.b_description, co.status, co.rating, co.num_enroll, co.num_rating
    FROM watch_list wl JOIN courses co on wl.course_id = co.course_id
    WHERE wl.user_id = $1`;

      const result = await db.many(sql, [userId]);
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
    } catch (err) {}
    return null;
  },
  getEnrollList: async (userId) => {
    try {
      const sql = `
    SELECT co.course_id, co.course_title, co.category_id, co.image, er.enroll_date, er.status
    FROM enrollments er JOIN courses co on er.course_id = co.course_id
    WHERE wl.user_id = $1`;

      const result = await db.many(sql, [userId]);

      return result;
    } catch (err) {}
    return null;
  },
  getHotCourse: async () => {
    const sql = `
    SELECT TOP(4) course_id, course_title, category_id, image, b_description
    FROM courses join view_number view on view.course_id = courses.course_id
    WHERE (current_date - date >= 0) and (current_date  - date <= 7)
    GROUP BY course_id, course_title, category_id, image, b_description
    ORDER BY num_view

    `;
  },
  get,
};
