const User = require('../models/user');
const speakeasy = require('speakeasy');

exports.loginUser = async function (req, res) {
    const { userId, token } = req.body;
    try {
        // Retrieve user from database
        const user = await new Promise((resolve, reject) => {
            User.getUserById(userId, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        console.log({ user })
        const secret = user[0].secret;
        // Returns true if the token matches
        const tokenValidates = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token,
            window: 1
        });
        if (tokenValidates) {
            res.json({ validated: true })
        } else {
            res.json({ validated: false })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving user' })
    };
};