const express = require('express');
const session = require('express-session');

const app = express();
const port = 5000;

app.set('view engine', 'ejs');
app.use(express.static('./frontend'));

app.get('/', (req, res) => {
    res.redirect('http://localhost:3000/');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening at :${port}`);
});