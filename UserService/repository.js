let Mongoose = require('mongoose');
let Model = require('./model');

/**
 *
 * @constructor
 */
const UserRepository = function() {};

function getConnection() {
  Mongoose.connect(TrackingServiceConfig.mongoConnectString, {useMongoClient: true}, function (error, next) {
    if (error) {
      next(error);
    }
  });
}
function closeConnection() {
  Mongoose.disconnect();
}

/**
 *
 * @param remoteAddress
 * @param userAgent
 *
 * @returns {Query}
 */
UserRepository.prototype.findOne = (remoteAddress, userAgent) => {
  getConnection();
  return Model.findOne({remoteAddress: remoteAddress, userAgent: userAgent}, (error, user, next) => {
    closeConnection();
    if (error) {
      next(error);
    }

    return user;
  });
};

/**
 *
 * @param remoteAddress
 * @param userAgent
 * @returns {Promise}
 */
UserRepository.prototype.create = function (remoteAddress, userAgent) {
  getConnection();
  return Model.create({remoteAddress: remoteAddress, userAgent: userAgent}, function (error, user, next) {
    closeConnection();
    if (error) {
      next(error);
    }

    return user;
  });
};

module.exports = new UserRepository();
