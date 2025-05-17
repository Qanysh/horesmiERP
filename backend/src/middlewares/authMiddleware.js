//authMiddleware.js

module.exports = function (req, res, next) {
    try {
        const user = req.session.userId;
        if (!user) {
            return res.status(403).json({ message: 'You have to login' });
        }
        next();
    } catch {
        console.error('Admin check failed:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};