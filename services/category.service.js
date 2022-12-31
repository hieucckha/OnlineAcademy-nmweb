import { v4 as uuidv4 } from 'uuid';

import db from '../utils/db.js';
import Category from '../models/category.models.js';

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
      RETURNING (category_id, category_parent, category_title)
    `;

    const result = await db.oneOrNone(sql, [uuidv4(), parent, title]);
    console.log(result);
    if (result === null) return null;

    return new Category(
      result.category_id,
      result.category_parent,
      result.category_title
    );
  },
  update: async (id, title) => {
    const sql = `
      UPDATE categories
      SET category_title = $2
      WHERE category_id = $1
      RETURNING (category_id, category_parent, category_title)
    `;

    const result = await db.oneOrNone(sql, [uuidv4(), parent, title]);

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

    if (result.length == 0) return null;

    return result.map((category) => {
      return category.category_id;
    });
  },
  checkIfHadCourse: (id) => {},
  delete: async (id) => {
    const sql = `
      DELETE FROM categories
      WHERE category_id = $1
    `;

    const result = await db.result(sql, [id]);

    if (result.rowCount == 0) return false;

    return true;
  },
};
