const express = require('express')
const router = express.Router();
const {getOrder, createOrder, updateStatus, deleteOrder} = require('../controllers/orderControllers')

router.get('/', getOrder);
router.post('/', createOrder);
router.put('/', updateStatus);
router.delete('/', deleteOrder);

module.exports = router;