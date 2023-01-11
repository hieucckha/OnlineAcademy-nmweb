import {v4 as uuidv4} from 'uuid';

import db from '../utils/db.js';
import Lecture from '../models/lecture.model.js';

export default {
    getInfoLecture: async (lectureId) => {
        try {
            const sql = `
                SELECT lecture_id,
                       section_id,
                       lecture_order,
                       lecture_title,
                       description,
                       source,
                       length,
                       is_preview
                FROM lectures
                WHERE lecture_id = $1
            `;

            const result = await db.one(sql, [lectureId]);

            const lecture = new Lecture(result.lecture_id, result.section_id, result.lecture_order, result.lecture_title, result.description, result.source, result.length, result.is_preview);

            return lecture;
        } catch (err) {
            console.log(err);
        }

        return null;
    }, getAllFullLecture: async (sectionId) => {
        try {
            const sql = `
                SELECT lecture_id,
                       section_id,
                       lecture_order,
                       lecture_title,
                       description,
                       source,
                       length,
                       is_preview
                FROM lectures
                WHERE section_id = $1
                ORDER BY lecture_order
            `;

            const result = await db.manyOrNone(sql, [sectionId]);

            if (result.length !== 0) {
                const listLecture = [];

                for (const lecture of result) {
                    const tmp = new Lecture(lecture.lecture_id, lecture.section_id, lecture.lecture_order, lecture.lecture_title, lecture.description, lecture.source, lecture.length, lecture.is_preview);

                    listLecture.push(tmp);
                }

                return listLecture;
            }
        } catch (err) {
            console.log(err);
        }

        return null;
    }, insert: async (sectionId, lectureOrder, lectureTitle, description, source, length, isPreview) => {
        try {
            const sql = `
                INSERT INTO lectures (lecture_id, section_id, lecture_order, lecture_title, description, source, length,
                                      is_preview)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *`;

            const result = await db.one(sql, [uuidv4(), sectionId, lectureOrder, lectureTitle, description, source, length, isPreview,]);

            return result;
        } catch (err) {
            console.log(err);
        }
        return null;
    }, update: async (lectureId, lectureOrder, lectureTitle, description, source, length, isPreview) => {
        try {
            const sql = `
                UPDATE lectures
                SET lecture_order=$2,
                    lecture_title=$3,
                    description=$4,
                    source=$5,
                    length=$6,
                    is_preview   = $7
                WHERE lecture_id = $1`;

            const result = await db.one(sql, [lectureId, lectureOrder, lectureTitle, description, source, length, isPreview,]);

            return result;
        } catch (err) {
            console.log(err);
        }
        return null;
    }, updateOrder: async (id, order) => {
        try {
            const sql = `
                UPDATE lectures
                SET lecture_order=$2
                WHERE lecture_id = $1
                RETURNING lecture_order`;

            const result = await db.one(sql, [id, order]);
            return result.lecture_order;
        } catch (err) {
            console.log(err);
        }
        return null;
    }, delete: async (id) => {
        try {
            const sql = `
                DELETE
                FROM lectures
                WHERE lecture_id = 1
                RETURNING lecture_id;
            `;
            const result = await db.one(sql, [id]);

            return result.lecture_id;
        } catch (err) {
            console.log(err);
        }
        return null;
    }, deleteBySectionId: async (sectionId) => {
        try {
            const sql = `
      DELETE lectures
      WHERE section_id = $1
      returning lecture_id`;

            const result = await db.many(sql, [sectionId]);

            return result;
        } catch (err) {
            console.log(err);
        }
        return null;
    },
};
