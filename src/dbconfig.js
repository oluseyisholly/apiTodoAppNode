const {Pool} = require('pg');
require('dotenv').config();

const { Sequelize } = require('sequelize');

const config = {
  database: 'TodoSequelize',//process.env.DATABASE,
  username: 'postgres',
  password: process.env.PASSWORD,
  host: process.env.HOST,
  dialect: 'postgres',
  port: process.env.PORT,
}

const sequelize = new Sequelize(config);


// const pool = new Pool({
//     user: 'postgres',
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD,
//     port: process.env.PORT,
//   }) // put all db connections in .env file

//   module.exports = pool; 


module.exports = sequelize;





   
    