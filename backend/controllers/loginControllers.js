const { Customer } = require('../models/customers');
const { Employee } = require('../models/employee');


const login = async (req, res) => {
  const { type,email, password } = req.body;


  try {
    let user = null
    // Check if a customer with the provided email exists
    if(type === 'Customer'){
      user = await Customer.findOne({ where: { email: email } });
    }else{
      user = await Employee.findOne({ where: { email: email } });
    }

    console.log(user)

    if (!user) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Validate password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Successful login
    return res.status(200).json({ message: 'Login successful', ...user,type: type });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const signup = async (req, res) => {
  const { customer_name, email, mobile, address, password } = req.body;

  try {
    // Check if the email is already registered
    // Create new customer
    const newCustomer = await Customer.create({
      customer_name,
      email,
      mobile,
      address,
      password
    });

    return res.status(201).json({ message: 'Customer created successfully', customer: newCustomer });
  } catch (error) {
    console.error('Sign up error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login, signup };