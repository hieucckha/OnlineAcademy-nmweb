import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

import db from '../utils/db.js';
import User from '../models/user.model.js';

export default {
  getByEmail: async (email) => {
    try {
      const sql = `
      SELECT user_id, email, password, avatar, first_name, last_name, caption, biography, role
      FROM users
      WHERE email = $1
    `;

      const salt = bcrypt.genSaltSync(10);

      const result = await db.one(sql, [email]);
      return new User(
        result.user_id,
        result.email,
        result.password,
        result.avatar,
        result.first_name,
        result.last_name,
        result.caption,
        result.biography,
        result.role
      );
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  getById: async (id) => {
    try {
      const sql = `
      SELECT user_id, email, password, avatar, first_name, last_name, caption, biography, role
      FROM users
      WHERE user_id = $1
    `;

      const result = await db.one(sql, [id]);
      return new User(
        result.user_id,
        result.email,
        result.password,
        result.avatar,
        result.first_name,
        result.last_name,
        result.caption,
        result.biography,
        result.role
      );
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  createStudent: async (email, password, firstName, lastName) => {
    try {
      const sql = `
      INSERT INTO users (user_id, email, password, first_name, last_name, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const result = await db.one(sql, [
        uuidv4(),
        email,
        hash,
        firstName,
        lastName,
        2,
      ]);

      const user = new User();
      user.userId = result.user_id;
      user.email = result.email;
      user.password = result.password;
      user.firstName = result.firstName;
      user.lastName = result.lastName;
      user.role = result.role;

      return user;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  createTeacher: async (email, password, firstName, lastName) => {
    try {
      const sql = `
      INSERT INTO users (user_id, email, password, first_name, last_name, role)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const result = await db.one(sql, [
        uuidv4(),
        email,
        hash,
        firstName,
        lastName,
        1,
      ]);

      const user = new User();
      user.userId = result.user_id;
      user.email = result.email;
      user.password = result.password;
      user.firstName = result.firstName;
      user.lastName = result.lastName;
      user.role = result.role;

      return user;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  updatePassword: async (userId, newPassword) => {
    try {
      const sql = `
        UPDATE users
        SET password = $2
        WHERE user_id = $1
        RETURNING (user_id, password)
    `;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPassword, salt);

      const result = await db.one(sql, [userId, hash]);

      const user = new User();
      user.userId = result.user_id;
      user.password = result.password;

      return user;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  updateInfo: async (
    userId,
    avatar,
    firstName,
    lastName,
    caption,
    biography
  ) => {
    try {
      const sql = `
        UPDATE users
        SET avatar = $2, first_name = $3, last_name = $4, caption = $5, biography = $6
        WHERE user_id = $1
        RETURNING *
      `;

      const result = await db.one(sql, [
        userId,
        avatar,
        firstName,
        lastName,
        caption,
        biography,
      ]);

      const user = new User();
      user.userId = result.user_id;
      user.firstName = result.firstName;
      user.lastName = result.lastName;
      user.caption = result.caption;
      user.biography = result.biography;
      user.role = result.role;

      return user;
    } catch (err) {
      console.log(err);
    }

    return null;
  },
  delete: async (userId) => {
    try {
      const sql = `
        DELETE users
        WHERE user_id = $1
      `;

      const result = await db.result(sql, [userId]);

      if (result.rowCount > 0) return true;
    } catch (err) {
      console.log(err);
    }

    return false;
  },
};
