FROM node:8.9.3
WORKDIR /usr/src/trackingImageService
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]