const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getAllUsers = async function (req, res) {
    try {
        User.getAllUsers((err, users) => {
            if (err) {
                console.error('Error fetching users:', err);
                return res.status(500).json({ error: 'Error fetching users data' });
            }
            res.json(users);
            console.log(users);
        });
    } catch (err) {
        console.error('Unexpected error fetching users:', err);
        res.status(500).json({ error: 'Unexpected error fetching users' });
    }
};
exports.getUserById = async function (req, res) {
    userId = req.params.id;
    try {
        User.getUserById(userId, (err, user) => {
            if (err) {
                console.error('Error fetching user:', err);
                return res.status(500).json({ error: 'Error fetching user data' });
            }
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        });
    } catch (err) {
        console.error('Unexpected error fetching user:', err);
        res.status(500).json({ error: 'Unexpected error fetching user' });
    }
};

exports.getCurrentUserRole = async function (req, res) {
    try {
        const userRole = req.session.role;
        if (!userRole) {
            return res.status(404).json({ error: 'User role not found' });
        }
        res.json({ role: userRole });
    } catch (err) {
        console.error('Error fetching user role:', err);
        res.status(500).json({ error: 'Failed to fetch user role' });
    }
};

exports.updateUser = async function (req, res) {

    const updatedUser = {
        username: req.body.username,
        updated_at: new Date(),
        role: req.body.role
    };

    if (!req.params.id) {
        return res.status(400).json({ error: 'User ID is missing' });
    }

    User.updateUser(req.params.id, updatedUser, (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: 'Failed to update user' });
        }
        res.json({ message: 'User updated successfully', user: updatedUser });
    });
};

exports.deleteUser = function (req, res) {
    User.deleteUser(req.params.id, (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Failed to delete user' });
        }
        res.json({ message: 'User deleted successfully' });
    });
};