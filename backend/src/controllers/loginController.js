const User = require('../models/user');
const speakeasy = require('speakeasy');
const bcrypt = require('bcryptjs');


exports.loginUser = async function (req, res) {
    const { token, email, password } = req.body;
    try {
        // Retrieve user from database
        const user = await new Promise((resolve, reject) => {
            User.getUserByEmail(email, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        console.log({ user })
        const secret = user[0].secret;
        // Returns true if the token matches
        if (Array.isArray(user) && user.length > 0) {
            const isMatch = await bcrypt.compare(password, user[0].password);
            if (isMatch) {
                const tokenValidates = speakeasy.totp.verify({
                    secret,
                    encoding: 'base32',
                    token,
                    window: 1
                });
                if (tokenValidates) {
                    req.session.userId = user[0].id;
                    req.session.role = user[0].role;
                    req.session.company = user[0].company;
                    res.json({ validated: true })
                } else {
                    res.json({ validated: false })
                }
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user' })
    };
};