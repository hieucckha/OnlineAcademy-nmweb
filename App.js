import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import homeRoutes from './routes/Home.route.js';
import courseRoutes from './routes/Course.route.js';
import searchRoutes from './routes/Search.route.js';
import registerRoutes from './routes/Register.route.js';

import activate_routes from './middlewares/routes.mdw.js';

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

activate_routes(app);

app.use(morgan('dev'));
app.use(express.static('public'));
app.engine('hbs', engine({
    defaultLayout: 'main.hbs'
}));
app.use('/public', express.static('public'));
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/', function(req, res){
    res.render('home.hbs');
})

app.use('/home', homeRoutes);
app.use('/course', courseRoutes);
app.use('/search-result', searchRoutes);
app.use('/register', registerRoutes);

app.listen(PORT, function() {
    console.log(`E-Commerce App listening at http://localhost:${PORT}`)
});