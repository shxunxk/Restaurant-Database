const express = require('express')
const router = express.Router();

const {getCustomer, createCustomer, updateCustomer, getEmployee, updateEmployee} = require('../controllers/customerEmployeeControllers')

router.get('/customer', getCustomer);
router.get('/employee', getEmployee);
router.post('/customer', createCustomer);
router.put('/customer/:customer_id', updateCustomer);
router.put('/employee/:employee_id', updateEmployee);

// router.post('/', createMenuItem)
// router.delete('/', deleteMenuItem);

module.exports = router;