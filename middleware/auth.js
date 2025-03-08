const { getUser } = require('../service/auth');

function checkForAuthentication(req, res, next) {


    const tokenCookie = req.cookies?.token;
    req.user = null;
    if (!tokenCookie) return next();
    const token = tokenCookie;
    const user = getUser(token)

    req.user = user;
    next();
}

//For Authorization
function restrictTo(roles = []) {
    return function (req, res, next) {
        if (!req.user) {
            return res.redirect("/login");
        }
        if (!roles.includes(req.user.role)) {
            res.end("Unaythorized");
        }

        return next();
    }
}


module.exports = {
    checkForAuthentication , restrictTo
   
}