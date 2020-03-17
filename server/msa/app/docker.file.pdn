FROM node:13.8.0-alpine3.10

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

EXPOSE 3000

CMD [ "node", "./app_modules/dist/bootstrap.js" ]