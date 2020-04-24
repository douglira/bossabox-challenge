FROM node:alpine

RUN mkdir -p /home/node/app/src
RUN mkdir /home/node/app/__tests__

COPY ./package.json /home/node/app/package.json
COPY ./index.js /home/node/app/index.js
COPY ./src /home/node/app/src
COPY ./.env.production /home/node/app/.env.production
COPY ./.env.test /home/node/app/.env.test
COPY ./__tests__ /home/node/app/__tests__

WORKDIR /home/node/app

ENV NODE_ENV=production

EXPOSE 3000

RUN npm install
RUN npm install pm2@latest -g

ENTRYPOINT [ "npm", "start" ]
