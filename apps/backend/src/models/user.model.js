import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  refreshToken: String
})

export default mongoose.model('User', userSchema)
