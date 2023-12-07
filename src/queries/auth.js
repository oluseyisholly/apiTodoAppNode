const pool = require('../dbconfig');
const jwt = require('jsonwebtoken')


const signUp = async (req, res) => {

    try {
        const {email, password, name} = req.body;

        // Check if the email already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  
        if (userExists?.rows?.length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }


        // Insert the new user into the database
        const newUser = await pool.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *', [
            email,
            password,
            name
        ]);

        res.json({ user: newUser.rows[0] });
  
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
}

const signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  
      if (user.rows.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Check if the password is correct
      const validPassword = password === user.rows[0].password;
  
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT
      const token = jwt.sign({ user_id: user.rows[0].id }, process?.env?.SECRET_KEY || 'secretkey');
  
      res.json({ token, userId: user.rows[0].id, name: user.rows[0].name });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  }


module.exports = {signUp, signIn} 

