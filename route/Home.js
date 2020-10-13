const express = require('express');
const router = express.Router();
//Home
router.get('/', async (req, res) => {

   res.render('Home/Index');
});

module.exports = router;