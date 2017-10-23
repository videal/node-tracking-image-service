/**
 * http://localhost:3000/?source=https://www.google.com.ua/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png
 * */

global.CONFIG = require('./config');

const micro = require('micro');

const server = micro(async (request, response) => {
  micro.send(response, 200);
});

server.listen(CONFIG.port);
