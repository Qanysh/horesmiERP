const User = require('../models/user');
const bcrypt = require('bcryptjs');

async function userExists(username) {
    try {
        const result = await new Promise((resolve, reject) => {
            User.getUserByUsername(username, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
        if (Array.isArray(result) && result.length > 0) {
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
};

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

exports.registerUser = async function(req, res) {
    const { username, email, password, re_password } = req.body;

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

        const userExistsCheck = await userExists(username);

        if (userExistsCheck) {
            return res.status(400).json({ error: 'User already exists!' });
        };

        const hashed_password = await bcrypt.hash(password, 10);
        const currentDate = new Date();

        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashed_password,
            created_at: currentDate,
        };

        if (!newUser.username || !newUser.password) {
            return res.status(400).json({ error: 'User data is empty' });
        }

        User.createUser(newUser, (err, result) => {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).json({ error: 'Failed to create user' });
            }
            res.status(201).json({ success: 'User created successfully' });
        });
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};
