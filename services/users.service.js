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
    const sql = `
    INSERT INTO users(user_id, email, phone_number, password, type, first_name, last_name, avatar, caption, biography, website, language)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

    const result = await db.oneOrNone(sql, [
      uuidv4(),
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
      lang,
    ]);

    if (result === null) return null;

    return new User(
      result.user_id,
      result.email,
      result.phone_number,
      result.p
    );
  },
  getInfo: async (id) => {},
  getPassword: async (id) => {},
  getType: async (id) => {},
  updateInfo: async (id) => {},
  updatePassword: async () => {},
  delete: async (id) => {},
};
