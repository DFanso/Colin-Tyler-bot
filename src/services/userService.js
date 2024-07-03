const User = require('../models/user');

class UserService {
  async createUser(userDTO) {
    const user = new User(userDTO);
    return user.save();
  }
}

module.exports = new UserService();
