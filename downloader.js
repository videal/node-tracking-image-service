const request = require('request');
const cache = require('memory-cache');

const onError = (err, done) => {
  if (done) {
    return done(err)
  }
  throw err
};

const downloader = (options = {}) => {
  if (!options.url) {
    throw new Error('The option url is required')
  }

  options = Object.assign({cacheTime: CONFIG.cacheTime}, options);

  const done = options.done;

  delete options.done;
  options.encoding = null;

  let image = cache.get(options.url);
  if (image) {
    done(false, image);
  }

  request(options, (err, res, body) => {
    if (err) {
      return onError(err, done);
    }

    if (body && res.statusCode === 200) {
      image = { headers: res.headers, body: body };
      cache.put(options.url, image, options.cacheTime * 1000);
      done(false, image);
    } else {
      if (!body) {
        return onError(new Error(`Image loading error - empty body. URL: ${options.url}`), done)
      }
      onError(new Error(`Image loading error - ${res.statusCode}. URL: ${options.url}`), done)
    }
  })
};

downloader.image = (options = {}) => new Promise((resolve, reject) => {
  options.done = (err, image) => {
    if (err) {
      return reject(err);
    }
    resolve(image);
  };

  downloader(options);
});

module.exports = downloader;
