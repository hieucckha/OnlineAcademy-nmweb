import pgPromise from 'pg-promise';

const pgp = pgPromise({});

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'academy_db',
  user: 'root',
  password: '123456',
  max: 30,
});

export default db;
