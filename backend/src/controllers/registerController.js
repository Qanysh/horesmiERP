const User = require('../models/user');
const uuid = require('uuid');
const speakeasy = require('speakeasy');

exports.registerUser = async function (req, res) {
    const id = uuid.v4();

    try {
        // const issuer = 'HoresmiERP';
        const email = req.body.email;
        const username = req.body.username;
        const company = req.body.company;
        const temp_secret = speakeasy.generateSecret();

        const newUser = {
            id: id,
            secret: temp_secret.base32,
            username: username,
            email: email,
            company: company,
            created_at: new Date(),
        };

        User.createUser(newUser, (err, result) => {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).json({ error: 'Failed to create user' });
            }
            res.status(201).json({ success: 'User created successfully', url: temp_secret.otpauth_url });
        });

    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

exports.verifyUser = async function (req, res) {
    const { userId, token } = req.body;
    try {
        // Retrieve user from database
        const user = await new Promise((resolve, reject) => {
            User.getUserById(userId, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        const secret = user[0].secret; // Base32 secret stored in the database
        const verified = speakeasy.totp.verify({
            secret,
            encoding: 'base32',
            token
        });

        if (verified) {
            // Update user data
            const updatedUser = {
                verified: 1, // Mark user as verified
                updated_at: new Date()
            };
            await User.updateUser(userId, updatedUser); // Assuming a method to update user
            res.json({ verified: true });
        } else {
            res.json({ verified: false });
        }
    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).json({ message: 'Error retrieving user' });
    }
};