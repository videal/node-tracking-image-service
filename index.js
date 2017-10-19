/**
 * http://localhost:3000/?source=https://www.google.com.ua/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png
 * */
const download = require('image-downloader');
const fs = require('fs');
const {send} = require('micro');
const {parse} = require('url');

module.exports = async (request, response) => {
  const statusCode = 200;

  /* Parses url and get needed param */
  let params = parse(request.url, true);
  if (!params.query.source) {
    return;
  }

  /* Checks is path_to_save exist */
  let tmpDist = './tmp';
  if (!fs.existsSync(tmpDist)) {
    fs.mkdirSync(tmpDist);
  }

  /* Gets an image and saves it */
  let {newFileName, image} = await download.image({url: params.query.source, dest: tmpDist});

  console.log('newFileName = ', newFileName);
  console.log('image = ', image);

  send(response, statusCode);
};