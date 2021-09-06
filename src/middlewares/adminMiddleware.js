module.exports = (req, res, next) => {
    if (req.session.user != undefined && req.session.user.admin_id == 1) {
        return next();
    } else {
        return res.redirect('/main')
    }
};