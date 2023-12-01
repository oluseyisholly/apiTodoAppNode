const express = require('express')
var cors = require('cors')

const bodyParser = require('body-parser')
const api = require('./api');

const app = express();
const PORT = 3300;

app.use(cors());

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/api', api);

app.get('/', (req, res) =>{
    res.json({
        message: 'My First Node.js Project'
    });
});



app.listen (PORT, () => {
    console.log('listening on port http://localhost:3300')
})