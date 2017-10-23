/**
 * http://localhost:3000/?source=https://www.google.com.ua/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png
 * */

global.CONFIG = require('./config');

const micro = require('micro');
const Downloader = require('./downloader');

const server = micro(async (request, response) => {
  /* Parses url and get needed param */
  let params = require('url').parse(request.url, true);
  if (!params.query[CONFIG.parameterName]) {
    return;
  }
  
  let url = params.query[CONFIG.parameterName];
  let image = await Downloader.image({url: url, cacheTime: 30});
  if (!image) {
    micro.send(response, 404);
  }
  micro.send(response, 200, image.body);
});

server.listen(CONFIG.port);
