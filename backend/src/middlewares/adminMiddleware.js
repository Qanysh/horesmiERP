// adminMiddleware.js

module.exports = function (req, res, next) {
    try {
        const userRole = String(req.session.role);
        if (!userRole) {
            return res.status(403).json({ message: 'No role found. Access denied.' });
        }
        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Insufficient role.' });
        }
        next();
    } catch (err) {
        console.error('Role check failed:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

