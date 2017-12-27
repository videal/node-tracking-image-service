/**
 * http://localhost:3000/?source=https://www.google.com.ua/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png
 * */

global.TrackingServiceConfig = require('./config');

const micro = require('micro');

const trackingService = require('./trackingImageService');
const fs = require('fs');

module.exports = async (request, response) => {

  let imageUrl = trackingService.getImageUrl(request);
  if (!imageUrl) {
    micro.send(response, 200);
    return;
  }

  trackingService.saveUserInfo(request, imageUrl);

  try {
    let image = await trackingService.getImage(imageUrl);
    response.writeHead(200, {
      'Content-Type': image.headers['content-type'],
      'Content-Length': image.headers['content-length']
    });
    response.end(image.body, 'binary');

  } catch (error) {

    let fakeImage = './public/image-not-found.png';
    let fakeImageStat = fs.statSync(fakeImage);

    response.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': fakeImageStat.size
    });

    let readStream = fs.createReadStream(fakeImage);
    readStream.pipe(response);
  }
};

