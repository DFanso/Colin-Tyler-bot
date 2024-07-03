const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true },
  discordId: { type: String, required: true, unique: true },
});

module.exports = model('User', UserSchema);
