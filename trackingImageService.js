const parse = require('url').parse;
const request = require('request');
const cache = require('memory-cache');
const UserFactory = require('./user');

const TrackingImageService = function () {};

/**
 * Parse Request Uri and returns Image Url if found
 * @param     {*}       req - Request
 * @returns   {string}  url - Image Url from request
 */
TrackingImageService.prototype.getImageUrl = req => {
  let params = parse(req.url, true);
  if (!params.query[CONFIG.parameterName]) {
    return '';
  }
  return params.query[CONFIG.parameterName];
};

/**
 * Returns an image with headers
 * @param {string}    url - Image url
 * @returns {object} image - Object with Image headers and body
 */
TrackingImageService.prototype.getImage = url => new Promise((resolve, reject) => {

  let image = cache.get(url);

  if (image) {
    resolve(image);
  }

  request.get(url, (err, result, body) => {
    if (!err && result.statusCode !== 200) {
      console.error("ERROR: " + err);
      reject(err);
    }
    image = {'headers': result.headers, 'body': body};
    cache.put(url, image, CONFIG.cacheTime * 1000);
    resolve(image);
  })
});

/**
 * Saves info about user
 * @param     {*}       req - Request
 * @param     {string}  imageUrl - requested image url
 * @returns   {boolean}
 */
TrackingImageService.prototype.saveUserInfo = async (req, imageUrl) => {
  let users = new UserFactory();
  let user = await users.getUser(req.socket.remoteAddress, req.headers['user-agent']);

  user.requestedImages.push({ url: imageUrl, date: new Date() });

  user.save(err => {
    if (err) {
      return console.log(err);
    }
  });

  return true;
};


module.exports = new TrackingImageService();