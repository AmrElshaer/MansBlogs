const express = require('express');
const router = express.Router();
//Home
router.get('/', async (req, res) => {

   res.redirect('/Blogs');
});

module.exports = router;