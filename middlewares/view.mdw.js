import {engine} from 'express-handlebars';
import hbs_sections from 'express-handlebars-sections';
import numeral from 'numeral';

export default function (app) {
    app.engine(
        'hbs',
        engine({
            extname: 'hbs',
            defaultLayout: 'main',
            helpers: {
                section: hbs_sections(),
                format_number(val) {
                    return numeral(val).format('0,0');
                },
                isActive(status, options) {
                    if (status === 0) {
                        return options.fn(this);
                    }
                    return options.inverse(this);
                }
            },
        })
    );
    app.set('view engine', 'hbs');
    app.set('views', './views');
}
