const express = require('express')
const router = express.Router();

const {getCustomer, createCustomer, updateCustomer} = require('../controllers/customerControllers')

router.get('/', getCustomer);
router.post('/', createCustomer);
router.put('/:customer_id', updateCustomer);

// router.post('/', createMenuItem)
// router.delete('/', deleteMenuItem);

module.exports = router;