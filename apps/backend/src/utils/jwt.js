import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()
const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
export const signAccessToken = (payload) => {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

export const signRefreshToken = (payload) => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}

export const verifyAccessToken = (token) => {
  return jwt.verify(token, ACCESS_SECRET)
}

export const verifyRefreshToken = (token) => {
  return jwt.verify(token,REFRESH_SECRET)
}
