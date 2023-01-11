import {v4 as uuidv4} from 'uuid';

import db from '../utils/db.js';
import Category from '../models/category.models.js';
import Course from "../models/course.model.js";

export default {
    get: async (id) => {
        const sql = `
            SELECT category_id, category_parent, category_title
            FROM categories
            WHERE category_id = $1
        `;

        const result = await db.oneOrNone(sql, [id]);

        if (result === null) return null;

        return new Category(
            result.category_id,
            result.category_parent,
            result.category_title
        );
    },
    getList: async () => {
        const sql = `
            SELECT category_id, category_parent, category_title
            FROM categories
        `;

        const result = await db.manyOrNone(sql);

        if (result.length === 0) return null;

        return result;
    },
    insert: async (parent, title) => {
        const sql = `
            INSERT INTO categories (category_id, category_parent, category_title)
            VALUES ($1, $2, $3)
            RETURNING category_id, category_parent, category_title
        `;

        const result = await db.oneOrNone(sql, [uuidv4(), parent, title]);

        if (result === null) return null;

        return new Category(
            result.category_id,
            result.category_parent,
            result.category_title
        );
    },
    update: async (categoryId, title) => {
        const sql = `
            UPDATE categories
            SET category_title = $2
            WHERE category_id = $1
            RETURNING category_id, category_parent, category_title
        `;

        const result = await db.oneOrNone(sql, [categoryId, title]);

        if (result === null) return null;

        return new Category(
            result.category_id,
            result.category_parent,
            result.category_title
        );
    },
    checkIsParent: async (id) => {
        const sql = `
            SELECT category_id
            FROM categories
            WHERE category_parent = $1
        `;

        const result = await db.manyOrNone(sql, [id]);

        if (result.length === 0) return null;

        return result.map((category) => {
            return category.category_id;
        });
    },
    delete: async (categoryId) => {
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
                    SELECT Count(course_id)
                    FROM courses
                    WHERE category_id = $1
                `;

                const result = await db.one(sql, [categoryId])

                if (result.count != 0)
                    return false;
            } else {
                sql = `
                    SELECT Count(course_id)
                    FROM courses
                    WHERE category_id IN (SELECT category_id
                                          FROM categories
                                          WHERE category_parent = $1)
                `;

                const result = await db.one(sql, [categoryId])

                if (result.count != 0)
                    return false;

                const deleteChildSql = `
                    DELETE
                    FROM categories
                    WHERE category_parent = $1
                `;

                const rowOfDelete = await db.result(deleteChildSql, [categoryId])
            }

            const deleteSql = `
                DELETE
                FROM categories
                WHERE category_id = $1
            `;

            const row = await db.result(deleteSql, [categoryId]);

            return row.rowCount !== 0;
        } catch (err) {
            console.log(err);
        }

        return false;
    },
};
