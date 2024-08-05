const { Sequelize } = require('sequelize');
const { Customer } = require('../models/customers');
const { Employee } = require('../models/employee');


const login = async (req, res) => {

  console.log(req.body)

  const { id, password, type } = req.body;

  try {
    let user = null

    // Check if a customer with the provided email exists
    if (type === 'Customer') {
    user = await Customer.findOne({ 
        where: { 
            [Sequelize.Op.or]: [
                { email: id },
                { mobile: id }
            ]
        }
    });
    } else if (type === 'Employee') {
        user = await Employee.findOne({ 
            where: { 
                [Sequelize.Op.or]: [
                    { email: id },
                    { mobile: id }
                ]
            }
        });
    }
    if (!user) {
      return res.status(404).json({ message: `${type} not found` });
    }

    // Validate password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Successful login
    const { password: _, ...userWithoutPassword } = user.toJSON(); // Exclude password from the response
    return res.status(200).json({ message: 'Login successful', user: userWithoutPassword, type });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const signup = async (req, res) => {
  const { username, email, mobile, password, type } = req.body;

  try {
    // Check if the email is already registered
    // Create new customer
    const newCustomer = await Customer.create({
      customer_name: username,
      email: email,
      mobile: mobile,
      password: password
    });

    return res.status(201).json({ message: 'Customer created successfully', customer: {...newCustomer, password:''} });
  } catch (error) {
    console.error('Sign up error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login, signup };