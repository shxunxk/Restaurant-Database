const Bill = require('../models/bill');
const generateIntId = require('../generateId');

const getBill = async (req, res) => {
  const {bill_id} = req.body
  try {
    let billItems
    if(bill_id){
      billItems = await Bill.findAll({
        where:{bill_id: bill_id}
      });
    }else{
      billItems = await Bill.findAll();
    }
    res.status(200).json(billItems);
  } catch (error) {
    res.status(500).json({ error: [error.message, bill_id] });
  }
};

const createBill = async (req, res) => {
  try {
    const {customer_id} = req.body;
    if (!customer_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const intId = generateIntId(3);
    const menuItem = await Bill.create({
      bill_id:intId, customer_id: customer_id
    });

    res.status(201).json(menuItem);
  } catch (error) {
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
  getBill,
  createBill
  //   deleteMenuItem,
};