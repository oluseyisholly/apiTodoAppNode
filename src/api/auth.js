const express = require('express');
const db = require('../queries/auth')

const authrouter = express.Router();


authrouter.post('/signup',  db.signUp)
authrouter.post('/signin',  db.signIn)


module.exports = authrouter;