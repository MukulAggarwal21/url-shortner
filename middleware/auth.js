const {getUser} = require('../service/auth')

async function restrictToLoggedinUserOnly(req, res, next){
    console.log(req);

    // const userUid = req.cookies?.uuid;
        const userUid = req.headers["authorization"];
      
        console.log(req.headers);
        

    if(!userUid) return res.redirect('/login');
   
    const token = userUid.split('Bearer ')[1];
    const user = await getUser(token);

    if(!user) return res.redirect('/login');

    req.user = user ;
    next();
}

async function checkAuth(req, res, next){
    // const userUid = req.cookies?.uuid;
        const userUid = req.headers["authorization"];
    const token = userUid.split('Bearer ')[1];
    const user = await getUser(token);
    // const user = getUser(userUid);

    req.user= user;
    next();
}


module.exports = {
    restrictToLoggedinUserOnly , checkAuth
}