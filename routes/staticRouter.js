const express = require("express");
const URL = require('../models/url')
const router = express.Router();

router.get('/' , async (req, res)=>{ 
    const allurls = await  URL.find( {} )
     return res.render('Home' , {
          urls: allurls 
     })
})

router.get('/signup' , (req, res)=>{
     return res.render("Signup");
})
router.get('/login' , (req, res)=>{
     return res.render("login");
})

module.exports = router; 