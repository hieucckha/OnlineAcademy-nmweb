import { hashSync } from 'bcryptjs';
import db from '../utils/db.js';

export default {
  insert: async (userId, courseId) => {
    try {
      const sql = `
    INSERT INTO enrollments (user_id, course_id, enroll_date, status)
    VALUES($1, $2, current_date, 0)`;

      const result = await db.one(sql, [userId, courseId]);

      return result;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  updateRating: async (userId, courseId, rating) => {
    try {
      const sql = `
      UPDATE enrollments
      SET rating = $3
      WHERE user_id=$1, course_id=$2
      RETURNING user_id, course_id`;

      const result = await db.one(sql, [userId, courseId, rating]);

      return result;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  updateComment: async (userId, courseId, comment) => {
    try {
      const sql = `
    UPDATE enrollments
    SET comment = $3
    WHERE user_id=$1, course_id=$2
    RETURNING user_id, course_id`;

      const result = await db.one(sql, [userId, courseId, comment]);

      return result;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  updateStatus: async (userId, courseId, status) => {
    try {
      const sql = `
      UPDATE enrollments
      SET status = $3
      WHERE user_id=$1, course_id=$2
      RETURNING user_id, course_id`;

      const result = await db.one(sql, [userId, courseId, status]);

      return result;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  delete: async(userId, courseId){
    try {
      const sql = `
    DELETE FROM enrollments
    WHERE user_id = $1, course_id=$2
    RETURNING user_id, course_id`;

      const result = await db.one(sql, [userId, courseId]);

      return result;
    }
    catch (err) {
      console.log(err);
    }

    return null;
  }
};
