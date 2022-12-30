import express from 'express';
import morgan from 'morgan';

import activate_session from './middlewares/session.mdw.js';
import activate_view from './middlewares/view.mdw.js';
import activate_routes from './middlewares/routes.mdw.js';
import activate_error_handlers from './middlewares/error.mdw.js';

const app = express();
app.use(morgan('dev'));
app.use(express.static('public'));
app.use('/public', express.static('public'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

activate_session(app);
activate_view(app);
activate_routes(app);
activate_error_handlers(app);

// app.engine(
//   'hbs',
//   engine({
//     defaultLayout: 'main.hbs',
//   })
// );
// app.set('view engine', 'hbs');
// app.set('views', './views');

// app.get('/', function (req, res) {
//   res.render('home.hbs');
// });

const PORT = 3000;
app.listen(PORT, function () {
  console.log(`App listening at http://localhost:${PORT}`);
});
