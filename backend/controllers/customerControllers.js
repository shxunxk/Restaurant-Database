const {Customer} = require('../models/customers');

const getCustomer = async (req, res) => {
  const {customer_id, type} = req.query
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

const updateCustomer = async (req, res) => {
  const { customer_id } = req.params; // Assuming customer_id is passed as a parameter in the URL
  const { updatedFields } = req.body; // Assuming updatedFields contains the fields to update

  console.log(customer_id)
  try {
    // Check if customer_id is provided
    if (!customer_id) {
      return res.status(400).json({ error: 'Customer ID is required' });
    }

    // Find the customer by customer_id
    let customer = await Customer.findOne({
      where: { customer_id: customer_id }
    });

    // If customer not found, return error
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Update the customer with the provided fields
    await customer.update(updatedFields);

    // Fetch the updated customer
    customer = await Customer.findOne({
      where: { customer_id: customer_id }
    });

    // Respond with the updated customer
    res.status(200).json({...customer, password: null});
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
  createCustomer,
  updateCustomer
  //   deleteMenuItem,
};