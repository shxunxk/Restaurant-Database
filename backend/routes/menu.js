const express = require('express')
const router = express.Router();
const {getMenu, createMenuItem, deleteMenuItem} = require('../controllers/menuControllers')

router.get('/', getMenu);
router.post('/', createMenuItem)
router.delete('/', deleteMenuItem);

module.exports = router;