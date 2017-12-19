const Parse = require('url').parse;
const Request = require('request');
const Cache = require('memory-cache');
const UserService = require('./UserService');

const TrackingImageService = function () {};

/**
 * Parse Request Uri and returns Image Url if found
 * @param     {*}       request - Request
 * @returns   {string}  url - Image Url from request
 */
TrackingImageService.prototype.getImageUrl = request => {
  let params = Parse(request.url, true);
  if (!params.query[TrackingServiceConfig.parameterName]) {
    return '';
  }
  return params.query[TrackingServiceConfig.parameterName];
};

/**
 * Returns an image with headers
 * @param {string}    url - Image url
 * @returns {object} image - Object with Image headers and body
 */
TrackingImageService.prototype.getImage = url => new Promise((resolve, reject) => {

  let image = Cache.get(url);

  if (image) {
    resolve(image);
  }

  Request.get(url, (error, result, body) => {
    if (!error && result.statusCode !== 200) {
      console.error("ERROR: " + error);
      reject(error);
    }
    image = {'headers': result.headers, 'body': body};
    Cache.put(url, image, TrackingServiceConfig.cacheTime * 1000);
    resolve(image);
  })
});

/**
 * Saves info about user
 * @param     {*}       request - Request
 * @param     {string}  imageUrl - requested image url
 * @returns   {boolean}
 */
TrackingImageService.prototype.saveUserInfo = async (request, imageUrl) => {
  let user = UserService.getUser(request.socket.remoteAddress, request.headers['user-agent']);

/*

  user.requestedImages.push({ url: imageUrl, date: new Date() });

  user.save(error => {
    if (error) {
      return console.log(error);
    }
  });

*/
  return true;
};


module.exports = new TrackingImageService();