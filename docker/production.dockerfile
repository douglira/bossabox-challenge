FROM node:alpine as builder

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN apk --no-cache add python make g++

COPY package.json ./
RUN npm install

FROM node:alpine

WORKDIR /usr/src/app

COPY --from=builder node_modules node_modules
COPY index.js ./
COPY src ./

RUN npm install pm2@latest -g

EXPOSE 3000

CMD [ "npm", "start" ]
