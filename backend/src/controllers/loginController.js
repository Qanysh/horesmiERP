const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.loginUser = async function(req, res) {
    const { username, password } = req.body;

    try {
        const user = await new Promise((resolve, reject) => {
            User.getUserByUsername(username, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        if (Array.isArray(user) && user.length > 0) {
            const isMatch = await bcrypt.compare(password, user[0].password);
            if (isMatch) {
                res.redirect('/customers'); // Успешная аутентификация
            } else {
                res.status(401).send('Incorrect password');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).send('Server error');
    }
};
