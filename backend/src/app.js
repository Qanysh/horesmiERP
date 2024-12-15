const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const customerRoutes = require('./routes/customerRoutes');
const itemRoutes = require('./routes/itemRoutes');
const errorMiddleware = require ('./middleware/errorMiddleware');

require('dotenv').config();

const app = express();
const port = 5000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/customers', customerRoutes);
app.use('/items', itemRoutes);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.redirect('http://localhost:3000/');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening at :${port}`);
});