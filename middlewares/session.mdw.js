import fnPostgresSessionStore from 'connect-pg-simple';
import session from 'express-session';
import db from '../utils/db.js';

export default function (app) {
  const PostgresSessionStore = fnPostgresSessionStore(session);
  const store = new PostgresSessionStore({
    pool: db,
  });
  app.set('trust proxy', 1);
  app.use(
    session({
      secret: 'cat dog cat dog and dog cat',
      resave: false,
      saveUninitialized: true,
      store: store,
      cookie: {
        // secure: true
      },
    })
  );
}
