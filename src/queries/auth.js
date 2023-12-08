const pool = require('../dbconfig');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const { where } = require('sequelize');


const signUp = async (req, res) => {

    try {
        const {email, password, name} = req.body;

        const userExists = await User.findOne({where: {email: email}});
  
        if (userExists?.dataValues) {
            return res.status(400).json({ message: 'User already exists' });
        }

        newUser = await User.create({email, password, name})

        res.json({ user: newUser?.dataValues });
  
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

const signIn = async (req, res) => {
    try {
      const { email, password } = req.body;

  
      // Check if the user exists
      const user = await User.findOne({where:{email }});
      

      console.log(user?.dataValues);
  
      if (!user?.dataValues) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Check if the password is correct
      const validPassword = password === user.dataValues?.password;
  
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT
      const token = jwt.sign({ user_id: user.dataValues?.id }, process?.env?.SECRET_KEY || 'secretkey');
  
      res.json({ token, userId: user.dataValues?.id, name: user.dataValues?.name });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  }


module.exports = {signUp, signIn} 

