// const { v4: uuidv4 } = require('uuid')
const User = require('../models/users');
const { setUser } = require('../service/auth')
async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    console.log("user", user);

    if (!user) {
        return res.render("login", {
            error: "Invalid Username or Password",
        });
    }

    const token = setUser(user);
 
    console.log("Generated Token:", token); // Log the generated token

    //ab response wala sikh rahe hain
    res.cookie("token", token);
        console.log("Cookies after setting token:", req.cookies); // Log the cookies

       return res.redirect('/');
}

module.exports = { handleUserSignup, handleUserLogin };