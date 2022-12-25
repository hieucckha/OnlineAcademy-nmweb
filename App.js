import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import teacherRoutes from './routes/teachers.route.js';

const app = express();

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

app.use('/teacher', teacherRoutes);

const port = 3000;

app.listen(port, function(){
    console.log(`App listening at http://localhost:${port}`);
});