const express = require('express')
const router = express.Router();

const {getBill, createBill} = require('../controllers/billControllers')

router.get('/', getBill);
router.post('/', createBill);
// router.post('/', createMenuItem)
// router.delete('/', deleteMenuItem);

module.exports = router;