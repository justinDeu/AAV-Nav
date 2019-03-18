// Imports essentially, require libraries
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// The port to run on, if using docker-compose, must match the mapped port
const PORT = 8000;

// Setting up the server
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs');

require('./routes')(app);

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
});
