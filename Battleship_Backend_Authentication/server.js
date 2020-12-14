const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

//creating express app
const app = express();

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//using cors to avoid CORS policy
app.use(cors())

//defining a root route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Batlleship."});
});

//importing routes
require('./app/routes/BatllshipAuth.routes')(app);

const dbConnection = require('./config/database.config');

//listen for requests
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
    console.log('Server running at http://127.0.0.1:' + port + '/');
});