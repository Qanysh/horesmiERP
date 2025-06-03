const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);
router.get('/users/:id', authMiddleware, adminMiddleware, adminController.getUserById);
router.put('/users/update/:id', authMiddleware, adminMiddleware, adminController.updateUser);
router.delete('/users/delete/:id', authMiddleware, adminMiddleware, adminController.deleteUser);

module.exports = router;