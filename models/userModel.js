const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, trim: true},
  email: {type: String, required: true, unique: true, lowercase: true},
  password: { type: String, required: true, minlength: 6 }
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);