const express = require("express");
const {restrictTo} = require('../middleware/auth')
const URL = require('../models/url')
const router = express.Router();



router.get('/admin/url' , restrictTo(['ADMIN']) , async (req, res)=>{ 
    const allurls = await  URL.find()
    return res.render('home' , {
         urls: allurls  , 
    })
})

router.get('/' , restrictTo(['NORMAL' , 'ADMIN']) ,  async (req, res)=>{ 
    const allurls = await  URL.find( { createdBy: req.user._id} )
     return res.render('Home' , {
          urls: allurls  , 
     })
})

router.get('/signup' , (req, res)=>{
     return res.render("Signup");
})
router.get('/login' , (req, res)=>{
     return res.render("login");
})

module.exports = router; 