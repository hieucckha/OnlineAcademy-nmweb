const bcrypt = require('bcrypt');
import { v4 as uuidv4 } from 'uuid';

import db from '../utils/db.js';
import User from '../models/Account.model';

export default {
  insert: async (
    email,
    phoneNumber,
    password,
    type,
    firstName,
    lastName,
    avatar,
    caption,
    bio,
    website,
    lang
  ) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const sql = `
    INSERT INTO users(user_id, email, phone_number, password, type, first_name, last_name, avatar, caption, biography, website, language)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

    const result = await db.oneOrNone(sql, [
      uuidv4(),
      email,
      phoneNumber,
      hashPassword,
      type,
      firstName,
      lastName,
      avatar,
      caption,
      bio,
      website,
      lang,
    ]);

    if (result === null) return null;

    return new User(
      result.user_id,
      result.email,
      result.phone_number,
      result.type,
      result.firstName,
      result.lastName,
      result.avatar,
      result.caption,
      result.bio,
      result.website,
      result.lang
    );
  },
  getInfo: async (id) => {
    const sql = `
    SELECT user_id, email, phone_number, type, first_name, last_name, avatar, caption, biography, website, language
    FROM users
    WHERE user_id = $1
    `;

    const result = await db.oneOrNone(sql, [id]);

    if (result === null) return null;

    return new User(
      result.user_id,
      result.email,
      result.phone_number,
      result.type,
      result.first_name,
      result.last_name,
      result.avatar,
      result.caption,
      result.biography,
      result.website,
      result.language
    );
  },
  checkUserValid: async (id, password) => {
    const sql = `
    SELECT password
    FROM users
    where user_id = $1
    `;

    const hashPassword = await db.oneOrNone(sql, [id, password]);
    if (hashPassword === null) return false;
    const rtn = await bcrypt.compare(password, hashPassword);
    if (rtn) {
      return true;
    }
  },
  getType: async (id) => {
    const sql = `
    SELECT type
    FROM users
    where user_id = $1
    `;

    const result = await db.oneOrNone(sql, [id]);

    if (result === null) return null;

    return result.type;
  },
  updateInfo: async (id) => {},
  updatePassword: async () => {},
  delete: async (id) => {},
};
