const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const itemRoutes = require('./routes/itemRoutes');
const adminRoutes = require('./routes/adminRoutes');
const errorMiddleware = require ('./middlewares/errorMiddleware');

require('dotenv').config();

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: 'horesmi_secret_key', // Секретный ключ для подписи сессий
    resave: false,             // Не сохранять сессию заново, если она не изменилась
    saveUninitialized: true,   // Сохранять пустые сессии
    cookie: {
        secure: false,         // Установите true, если используете HTTPS
        maxAge: 60000
    }
}));

app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.redirect('http://localhost:80/');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening at :${port}`);
});