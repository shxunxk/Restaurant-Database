const express = require('express')
const router = express.Router();
const {getOrderforOrderID} = require('../controllers/orderItemsControllers')

router.get('/', getOrderforOrderID);

module.exports = router;