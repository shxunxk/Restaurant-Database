const express = require('express')
const router = express.Router();

const {getBill, createBill, updateStatus} = require('../controllers/billControllers')

router.get('/', getBill);
router.post('/', createBill);
router.put('/', updateStatus);
// router.post('/', createMenuItem)
// router.delete('/', deleteMenuItem);

module.exports = router;