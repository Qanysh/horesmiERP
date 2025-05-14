const User = require('../models/user');
const uuid = require('uuid');
const speakeasy = require('speakeasy');
const bcrypt = require('bcryptjs');

async function emailExists(email) {
    try {
        const result = await new Promise((resolve, reject) => {
            User.getUserByEmail(email, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        if (Array.isArray(result) && result.length > 0) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error checking email existence:', error);
        throw error;
    }
};
exports.registerUser = async function (req, res) {
    const { username, email, company, password, re_password } = req.body;
    const id = uuid.v4();

    if (password !== re_password) {
        return res.status(400).json({ error: 'Passwords do not match!' });
    }

    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long!' });
    }


    try {
        const emailExistsCheck = await emailExists(email);
        if (emailExistsCheck) {
            return res.status(400).json({ error: 'User with this email already exists!' });
        };
        const hashed_password = await bcrypt.hash(password, 10);

        const temp_secret = speakeasy.generateSecret();

        const newUser = {
            id: id,
            secret: temp_secret.base32,
            username: username,
            email: email,
            password: hashed_password,
            company: company,
            created_at: new Date(),
            updated_at: new Date()
        };

        if (!newUser.username || !newUser.password) {
            return res.status(400).json({ error: 'User data is empty' });
        }

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