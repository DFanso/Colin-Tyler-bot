const mongoose = require('mongoose');

const IdentifierSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Identifier = mongoose.model('Identifier', IdentifierSchema);
module.exports = Identifier;
