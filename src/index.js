const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser')
const api = require('./api');
const auth = require('./api/auth')
const verifyToken = require('./middleware/verifyToken')
// const User = require('./models/user');
// const Event = require('./models/event');
// const sequelize = require('./models/index');

const bcrypt = require('bcrypt');

const password = 'Oluseyi@123';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error(err);
  } else {
    console.log('Hashed Password:', hash);
  }
});




const app = express();
const PORT = 3300; // .env

app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/api/auth', auth);


app.use('/api', verifyToken,  api);


app.get('/', (req, res) =>{
    res.json({
        message: 'My First Node.js Project'
    });
});




app.listen (PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`)
})