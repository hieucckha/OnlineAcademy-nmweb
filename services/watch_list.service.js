import db from '../utils/db.js';

export default {
  insert: async (userId, courseId) => {
    try {
      const sqlInsert = `
      INSERT INTO watch_lists(user_id, course_id)
      VALUES ($1, $2)
      RETURNING user_id`;

      const result = await db.one(sqlInsert, [userId, courseId]);

      return result;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  delete: async (userId, courseId) => {
    try {
      const sql = `
      DELETE FROM watch_list
      WHERE user_id =$1 and course_id = $2
      RETURNING user_id`;

      const result = await db.one(sql, [userId, courseId]);

      return result;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
};
