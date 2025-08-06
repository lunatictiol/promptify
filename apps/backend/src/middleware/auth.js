import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'Access token missing' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, ACCESS_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      const refreshToken = req.headers['x-refresh-token'];

      if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token missing' });
      }

      try {
        const decodedRefresh = jwt.verify(refreshToken, REFRESH_SECRET);
        const user = await User.findById(decodedRefresh.id);

        if (!user || user.refreshToken !== refreshToken) {
          return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const newAccessToken = jwt.sign({ id: user._id }, ACCESS_SECRET, {
          expiresIn: '15m',
        });

        res.setHeader('x-access-token', newAccessToken);
        req.user = { id: user._id };
        return next();
      } catch (refreshErr) {
        return res.status(403).json({ message: 'Refresh token expired or invalid' });
      }
    }

    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default auth;
