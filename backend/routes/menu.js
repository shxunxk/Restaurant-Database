const express = require('express')
const router = express.Router();
const {getMenu, createMenuItem, deleteMenuItem, updateMenuItem} = require('../controllers/menuControllers')

router.get('/', getMenu);
router.post('/', createMenuItem)
router.delete('/', deleteMenuItem);
router.put('/', updateMenuItem);

module.exports = router;