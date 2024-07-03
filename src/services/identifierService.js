const Identifier = require('../models/identifier');

class IdentifierService {
  static async addIdentifier(type, value) {
    // Validate type
    if (type !== 'binary' && type !== 'triple') {
      return `Invalid type: ${type}. Must be 'binary' or 'triple'.`;
    }

    // Check if identifier already exists
    const existingIdentifier = await Identifier.findOne({ type, value });
    if (existingIdentifier) {
      return `Identifier ${value} already exists for type ${type}.`;
    }

    const identifier = new Identifier({ type, value });
    await identifier.save();
    return `Added ${type} identifier: ${value}`;
  }

  static async removeIdentifier(type, value) {
    // Validate type
    if (type !== 'binary' && type !== 'triple') {
      return `Invalid type: ${type}. Must be 'binary' or 'triple'.`;
    }

    const result = await Identifier.findOneAndDelete({ type, value });
    if (!result) {
      return `No identifiers found for type: ${type} with value: ${value}`;
    }
    return `Removed ${type} identifier: ${value}`;
  }

  static async viewIdentifiers(type) {
    // Validate type
    if (type !== 'binary' && type !== 'triple') {
      return `Invalid type: ${type}. Must be 'binary' or 'triple'.`;
    }

    const identifiers = await Identifier.find({ type });
    if (!identifiers.length) {
      return null;
    }
    return identifiers.map(identifier => identifier.value);
  }
}

module.exports = IdentifierService;
