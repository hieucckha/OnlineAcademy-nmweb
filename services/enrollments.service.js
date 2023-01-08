import db from '../utils/db.js';

import coursesService from "./courses.service.js";
import Feedback from "../models/feedback.model.js";

export default {
    insert: async (userId, courseId) => {
        try {
            const sql = `
                INSERT INTO enrollments (user_id, course_id, enroll_date, status)
                VALUES ($1, $2, current_date, 0)
                RETURNING user_id, course_id
            `;

            const result = await db.one(sql, [userId, courseId]);

            await coursesService.updateNumEnroll(result.course_id);

            return result;
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    isFeedback: async (userId, courseId) => {
        try {
            const checkExistFeedback = `
                SELECT rating, comment
                FROM enrollments
                WHERE user_id = $1
                  AND course_id = $2
            `;

            const isFeedbackExists = await db.one(checkExistFeedback, [userId, courseId]);
            return isFeedbackExists.rating != null;
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    ratingAndComment: async (userId, courseId, rating, comment) => {
        try {
            const sql = `
                UPDATE enrollments
                SET rating  = $3,
                    comment = $4
                WHERE user_id = $1
                  AND course_id = $2
                RETURNING user_id, course_id
            `;

            const result = await db.one(sql, [userId, courseId, rating, comment]);

            await coursesService.updateNumRating(result.course_id);
            await coursesService.updateRating(result.course_id);

            return result;
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getListFeedback: async (courseId) => {
        try {
            const sql = `
                SELECT users.user_id, course_id, first_name, last_name, rating, comment
                FROM enrollments
                         join users on enrollments.user_id = users.user_id
                WHERE course_id = $1
            `;

            const result = await db.manyOrNone(sql, [courseId]);

            if (result.length !== 0) {
                const listFeedback = []

                for (const feedback of result) {
                    listFeedback.push(new Feedback(feedback.user_id, feedback.course_id, feedback.first_name, feedback.last_name, feedback.rating, feedback.comment))
                }

                return listFeedback;
            }
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
                WHERE user_id = $1, course_id=$2
                    RETURNING user_id
                    , course_id`;

            const result = await db.one(sql, [userId, courseId, status]);

            return result;
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    delete: async (userId, courseId) => {
        try {
            const sql = `
                DELETE
                FROM enrollments
                WHERE user_id = $1
                  and course_id = $2
                RETURNING user_id, course_id`;

            const result = await db.one(sql, [userId, courseId]);

            return result;
        } catch (err) {
            console.log(err);
        }

        return null;
    },


};
