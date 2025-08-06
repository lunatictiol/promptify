import * as authService from '../services/auth.service.js';

export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({ message: 'Registered successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const tokens = await authService.loginUser(req.body);
    res.status(200).json(tokens);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.headers['x-refresh-token']; // or from cookie

  if (!refreshToken)
    return res.status(403).json({ message: 'Refresh token missing' });

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);
    const user = await user.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = jwt.sign({ id: user._id }, ACCESS_SECRET, {
      expiresIn: '15m',
    });

    return res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: 'Refresh token expired or invalid' });
  }
};
