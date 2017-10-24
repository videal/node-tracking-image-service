/**
 * http://localhost:3000/?source=https://www.google.com.ua/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png
 * */

global.CONFIG = require('./config');

const micro = require('micro');
const tis = require('./trackingImageService');

module.exports = async (req, res) => {

  let imageUrl = tis.getImageUrl(req);
  if (!imageUrl) {
    micro.send(res, 200);
    return;
  }

  tis.saveUserInfo(req);

  try {
    let image = await tis.getImage(imageUrl);
    res.setHeader('Content-Type', image.headers['content-type']);
    res.write(image.body, 'binary');
    micro.send(200, res);

  } catch (error) {
    micro.send(res, 404);
  }
};

