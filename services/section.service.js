import {v4 as uuidv4} from 'uuid';

import db from '../utils/db.js';
import Section from '../models/section.model.js';
import lectureService from './lecture.service.js';

export default {
    getInfoSection: async (sectionId) => {
        try {
            const sql = `
                SELECT section_id, section_order, section_title, course_id
                FROM sections
                WHERE section_id = $1
            `;

            const result = await db.one(sql, [sectionId]);

            return result;
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    getAllFullSection: async (courseId) => {
        try {
            const sql = `
                SELECT section_id, section_order, section_title, course_id
                FROM sections
                WHERE course_id = $1
                ORDER BY section_order
            `;

            const result = await db.manyOrNone(sql, [courseId]);

            if (result.length !== 0) {
                const listSection = [];

                for (let section of result) {
                    const tmp = new Section(section.section_id, section.section_order, section.section_title, section.course_id);

                    tmp.listLecture = await lectureService.getAllFullLecture(section.section_id);

                    listSection.push(tmp);
                }

                return listSection;
            }
        } catch (err) {
            console.log(err);
        }

        return null;
    },
    insert: async (sectionOrder, sectionTitle, courseId) => {
        try {
            const sql = `
                INSERT INTO sections (section_id, section_order, section_title, course_id)
                VALUES ($1, $2, $3, $4)
                RETURNING section_id`;

            const result = await db.one(sql, [uuidv4(), sectionOrder, sectionTitle, courseId,]);

            return result.section_id;
        } catch (err) {
            console.log(err);
        }
        return null;
    },
    delete: async (id) => {
        try {
            const sql = `
                DELETE
                FROM sections
                WHERE section_id = $1
                RETURNING section_id`;

            await lectureService.deleteBySectionId(id);
            const result = await db.one(sql, [id]);

            return result.section_id;
        } catch (err) {
            console.log(err);
        }
        return null;
    },
    deleteByCourseId: async (courseId) => {
        try {
            const sql = `
                SELECT section_id
                FROM sections
                WHERE course_id = $1
            `;

            const sectionsId = await db.many(sql, [courseId]);
            sectionsId.forEach(async (sectionId) => {
                await lectureService.deleteBySectionId(sectionId);
            });

            return sectionsId;
        } catch (err) {
            console.log(err);
        }
        return null;
    },
    update: async (sectionId, sectionOrder, sectionTitle) => {
        try {
            const sql = `
                UPDATE sections
                SET section_order = $2,
                    section_title =$3
                WHERE section_id = $1
                RETURNING section_id`;

            const result = await db.one(sql, [sectionId, sectionOrder, sectionTitle]);

            return result.section_id;
        } catch (err) {
            console.log(err);
        }

        return null;
    },
};
