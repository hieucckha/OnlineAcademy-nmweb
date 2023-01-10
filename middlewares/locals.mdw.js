export default function (app) {
    app.use(async function (req, res, next) {
        
        if (typeof(req.session.auth) === 'undefined'){
            req.session.auth = false;
        }

        res.locals.auth  = req.session.auth;
        res.locals.authUser = req.session.authUser;
        next();
    });
}