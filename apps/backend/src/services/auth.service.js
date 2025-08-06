import bcrypt from 'bcryptjs';
import { signAccessToken, signRefreshToken } from '../utils/jwt.js';
import ApiError from '../utils/apiError.js';
import User from '../models/user.model.js'; // Adjust the path as needed

export const registerUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });
  const accessToken = signAccessToken({ id: newUser._id, email: newUser.email });
  const refreshToken = signRefreshToken({ id: newUser._id });
  newUser.refreshToken = refreshToken;
  await newUser.save();

  return { id: newUser._id, username: newUser.username, email: newUser.email,accessToken:accessToken };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const accessToken = signAccessToken({ id: user._id, email: user.email });
  const refreshToken = signRefreshToken({ id: user._id });

  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};



export const refreshAccessToken = async (token) => {
  try {
    const payload = verifyRefreshToken(token);
    const user = await User.findById(payload.userId);
    if (!user || user.refreshToken !== token) {
      throw new ApiError(403, 'Invalid refresh token');
    }

    const accessToken = generateAccessToken(user._id);
    return { accessToken };
  } catch (err) {
    throw new ApiError(403, 'Invalid refresh token');
  }
};
