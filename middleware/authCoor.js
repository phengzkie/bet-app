const jwt = require('jsonwebtoken');
const config = require('config');

const authCoor = () => {
	return [
		(req, res, next) => {
			// Get Token from the Header
			const token = req.header('x-auth-token');

			// Check if not token
			if (!token) {
				return res.status(401).json({ msg: 'No Token, Authorization Denied' });
			}

			try {
				const decoded = jwt.verify(token, config.get('jwtSecret'));

				req.coordinator = decoded.coordinator;
				next();
			} catch (err) {
				res.status(401).json({ msg: 'Token is not valid' });
			}
		}
	];
};

module.exports = authCoor;
