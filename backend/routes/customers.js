const express = require('express')
const router = express.Router();

const {getCustomer, createCustomer} = require('../controllers/customerControllers')

router.get('/', getCustomer);
router.post('/', createCustomer);
// router.post('/', createMenuItem)
// router.delete('/', deleteMenuItem);

module.exports = router;