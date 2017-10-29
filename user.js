const UserFactory = function() {};

const Schema = Mongoose.Schema;
const RequestedImageSchema = new Schema({
  url:    { type: String, index: true },
  status: { type: Number },
  date:   { type: Date }
});
const UserSchema = new Schema({
  remoteAddress:    { type: String, index: true, required: true },
  userAgent:        { type: String, index: true, required: true },
  requestedImages:  [RequestedImageSchema]
});
const UserModel = Mongoose.model('user', UserSchema);

/**
 * Returns a User - new or existed.
 * @param {string}  remoteAddress - User's remove Address
 * @param {string}  userAgent - User-Agent from headers
 */
UserFactory.prototype.getUser = (remoteAddress, userAgent) => new Promise((resolve, reject) => {
  UserModel.findOne({remoteAddress: remoteAddress, userAgent: userAgent}, (err, user) => {
    if (err) {
      reject(err);
    }
    if (!user) {
      user = new UserModel({remoteAddress: remoteAddress, userAgent: userAgent});
    }
    resolve(user);
  });
});

module.exports = UserFactory;