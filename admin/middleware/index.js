const authMiddleware = (app) => {
    app.use('/admin/blogs', (req, res, next) => {
        if (!req.session.userauth) {
            return res.redirect("/admin/login")
            //return res.redirect('/login');
        } else {
            next();
        }
    });
    app.use('/admin/products', (req, res, next) => {
        
        if (!req.session.userauth) {
            return res.redirect("/admin/login")
            //return res.redirect('/login');
        } else {
            next();
        }
    });
    app.use('/admin/logout', (req, res, next) => {
        if (!req.session.userauth) {
            return res.redirect("/admin/login")
            ///return res.redirect('/');
        } else {
            next();
        }
    });
    app.use('/admin/change-password', (req, res, next) => {
        if (!req.session.userauth) {
            return res.redirect("/admin/login")
            ///return res.redirect('/');
        } else {
            next();
        }
    });
    app.use('/admin/all-user', (req, res, next) => {
        if (!req.session.userauth) {
            return res.redirect("/admin/login")
            ///return res.redirect('/');
        } else {
            next();
        }
    });
    app.use('/admin/blogCategorys', (req, res, next) => {
        if (!req.session.userauth) {
            return res.redirect("/admin/login")
            ///return res.redirect('/');
        } else {
            next();
        }
    });
    app.use('/admin/subscription', (req, res, next) => {
        if (!req.session.userauth) {
            return res.redirect("/admin/login")
            ///return res.redirect('/');
        } else {
            next();
        }
    });
};

module.exports = authMiddleware;