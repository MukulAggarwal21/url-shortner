const express = require('express');
const {handleGenerateNewShortURL , handleGetAnalytics} = require('../controllers/url')

const router = express.Router();

router.post("/" , handleGenerateNewShortURL);

//to show the analytics of clicks 
router.get('/analytics/:shortId' ,handleGetAnalytics )

module.exports = router; 