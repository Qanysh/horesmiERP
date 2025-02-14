// adminMiddleware.js

module.exports = function (req, res, next) {
    try {
        const isAdmin = req.session.isAdmin;
        if (!isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        next();
    } catch (err) {
        console.error('Admin check failed:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
