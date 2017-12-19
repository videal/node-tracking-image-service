let Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;

module.exports = {
  "port": 3000,
  "parameterName": "source",
  "cacheTime": 40,
  "mongoConnectString": "mongodb://localhost/trackingImageService"
};