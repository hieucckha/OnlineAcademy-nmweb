import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import homeRoutes from './routes/Home.route.js';
import courseListRoutes from './routes/CourseList.route.js';
import searchRoutes from './routes/Search.route.js';
import registerRoutes from './routes/Register.route.js';

import activate_session from './middlewares/session.mdw.js';
import activate_view from './middlewares/view.mdw.js';
import activate_locals from './middlewares/locals.mdw.js';
import activate_routes from './middlewares/routes.mdw.js';

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

activate_routes(app);

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


activate_session(app);
activate_view(app);
activate_locals(app);
activate_routes(app);
activate_error_handlers(app);

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`App listening at http://localhost:${PORT}`);
});
