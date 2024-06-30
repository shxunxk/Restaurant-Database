const Menu = require('../models/menu');

const getMenu = async (req, res) => {
  const {type} = req.query
  try {
    let menuItems
    if(!type){
      // console.log(type)
      menuItems = await Menu.findAll();
    }else{
      menuItems = await Menu.findAll({
        where:{item_type:type}
      });
    }
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMenuItem = async (req, res) => {
  try {
    const { item_name, price, item_type, image } = req.body;

    // Check if required fields are provided
    if (!item_name || !item_type || !price || !image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const menuItem = await Menu.create({
      item_name: item_name,
      item_type: item_type,
      price: price,
      image: image
    });

    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMenuItem = async (req, res) => {

  const { item_id, item_name, price, image, item_type } = req.body;

  if (!item_id || !item_name || !price || !image || !item_type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const item = await Menu.findByPk(item_id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    item.item_name = item_name;
    item.price = price;
    item.image = image;
    item.item_type = item_type;
    await item.save();

    res.status(200).json({ message: 'Item updated successfully', item });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    console.log(req.body);
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ error: 'Invalid itemType. Must be "id" or "name".' });
    }

    const menuItem = await Menu.findOne({ where: { item_id: itemId } });

    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    await menuItem.destroy();

    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getMenu,
  createMenuItem,
  deleteMenuItem,
  updateMenuItem
};