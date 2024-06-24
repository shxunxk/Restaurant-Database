const Customer = require('../models/customers');

const getCustomer = async (req, res) => {
  const {customer_id} = req.body
  try {
    let customer
    if(customer_id){
      customer = await Customer.findAll({
        where:{customer_id: customer_id}
      });
    }else{
      customer = await Customer.findAll();
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCustomer = async (req, res) => {
  try {
    const {customer_id} = req.body;
    // Check if required fields are provided
    if (!customer_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const customer = await Customer.create({
      customer_id: customer_id
    });

    // Respond with the created menu item
    res.status(201).json(customer);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};

// const deleteMenuItem = async (req, res) => {
//   try {

//     const { itemType, itemId } = req.body;

//     let menuItem;

//     // Determine the search criteria based on itemType
//     if (itemType === 'item_id') {
//       menuItem = await Menu.findByPk(itemId);
//     } else if (itemType === 'item_name') {
//       menuItem = await Menu.findOne({ where: { item_name: itemId } });
//     } else {
//       return res.status(400).json({ error: 'Invalid itemType. Must be "id" or "name".' });
//     }

//     // If menuItem is not found, return 404
//     if (!menuItem) {
//       return res.status(404).json({ error: 'Menu item not found' });
//     }

//     // Delete the menu item
//     await menuItem.destroy();

//     // Respond with a success message
//     res.status(200).json({ message: 'Menu item deleted successfully' });
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = {
  getCustomer,
  createCustomer
  //   deleteMenuItem,
};