
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process?.env?.SECRET_KEY || 'secretkey');


      req.user = decoded.user_id;
      console.log(decoded)
      next();
    } catch (error) {
      console.error(error.message);
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  


  module.exports =  verifyToken;