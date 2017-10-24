const parse = require('url').parse;
const request = require('request');
const cache = require('memory-cache');

const TrackingImageService = function () {};


/**
 * Parse Request Uri and returns Image Url if found
 * @param     {*}       req     Request
 * @returns   {string}  url     Image Url from request
 */
TrackingImageService.prototype.getImageUrl = req => {
  let params = parse(req.url, true);
  if (!params.query[CONFIG.parameterName]) {
    return '';
  }
  return params.query[CONFIG.parameterName];
};


/**
 * Saves info about user
 * @param     {*}       req   Request
 * @returns   {boolean}
 */
TrackingImageService.prototype.saveUserInfo = req => {
  return true;
};


/**
 * Returns an image with headers
 * @param url
 * @returns {Promise}
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



module.exports = new TrackingImageService();