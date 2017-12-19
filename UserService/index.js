let Repository = require('./repository');

const UserService = function() {};

/**
 * Returns a User - new or existed.
 *
 * @param {string}  remoteAddress - UserService's remove Address
 * @param {string}  userAgent - UserService-Agent from headers
 *
 * @returns {Promise<*>}
 */
UserService.prototype.getUser = async (remoteAddress, userAgent) => {
  let user = await Repository.findOne(remoteAddress, userAgent);
  if (!user) {
    user = await Repository.create(remoteAddress, userAgent);
  }

  return user;
};

module.exports = new UserService();