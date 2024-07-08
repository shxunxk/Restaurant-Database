const express = require('express')
const router = express.Router();

const {login, signup} = require('../controllers/loginControllers')

router.post('/', login);
router.post('/signin', login);


module.exports = router;