let Mongoose = require('mongoose');
let Schema = Mongoose.Schema;

const RequestedImageSchema = new Schema({
  url: {
    index: true,
    type: String,
    required: [true,'RequestedImageUrlRequired']
  },
  status: {
    type: Number
  },
  date: {
    type: Date,
    required: [true,'RequestedImageDateRequired']
  }
});

const UserSchema = new Schema({
  remoteAddress: {
    index: true,
    type: String,
    required: [true,'UserRemoteAddressRequired']
  },
  userAgent: {
    index: true,
    type: String,
    required: [true, 'UserUserAgentRequired']
  },
  requestedImages: [RequestedImageSchema]
});

module.exports = Mongoose.model('User', UserSchema);