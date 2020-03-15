const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (roles = []) => {
  // roles param can be a single role string (e.g. Role.Staff or 'Staff')
  // or an array of roles (e.g. [Role.Admin, Role.Staff] or ['Admin', 'Staff'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    (req, res, next) => {
      // Get Token from the Header
      const token = req.header('x-auth-token');

      // Check if not token
      if (!token) {
        return res.status(401).json({ msg: 'No Token, Authorization Denied' });
      }

      try {
        if (roles.length && !roles.includes(req.user.role)) {
          // user's role is not authorized
          return res.status(401).json({ msg: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
      } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
      }
    }
  ];
};

module.exports = auth;
