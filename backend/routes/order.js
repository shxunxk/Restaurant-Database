const express = require('express')
const router = express.Router();
const {getOrder, createOrder, updateStatus} = require('../controllers/orderControllers')

router.get('/', getOrder);
router.post('/', createOrder);
router.put('/', updateStatus);

module.exports = router;