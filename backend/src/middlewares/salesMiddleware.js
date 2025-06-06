module.exports = function (req, res, next) {

    try {
        const userRole = req.session.role;
        if (!userRole) {
            return res.status(403).json({ message: 'No role found. Access denied.' });
        }
        if (userRole !== 'sales manager' || userRole !== 'admin' || userRole !== 'manager') {
            return res.status(403).json({ message: 'Access denied. Insufficient role.' });
        }
        next();
    } catch (err) {
        console.error('Role check failed:', err);
        res.status(500).json({ message: 'Internal server error.' });
    }
};