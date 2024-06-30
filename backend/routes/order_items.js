const express = require('express')
const router = express.Router();
const {getOrderforOrderID, genOrderforOrderID} = require('../controllers/orderItemsControllers')

router.get('/', getOrderforOrderID);
router.post('/', genOrderforOrderID)

module.exports = router;