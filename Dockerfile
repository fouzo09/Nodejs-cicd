FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . ./

EXPOSE 4040

CMD [ "node", "index.js" ]

