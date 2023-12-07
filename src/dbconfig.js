const {Pool} = require('pg');
require('dotenv').config();



const pool = new Pool({
    user: 'postgres',
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  }) // put all db connections in .env file

  module.exports = pool; 