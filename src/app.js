// Imports essentially, require libraries
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Setting up the server
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '/public')))
app.set('view engine', 'ejs');

require('./routes')(app);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
