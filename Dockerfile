FROM node:alpine

RUN apk --no-cache add curl

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . ./

EXPOSE 4040

CMD [ "node", "index.js" ]

