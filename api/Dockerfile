FROM node:19-alpine

WORKDIR /app

COPY package.json .

RUN npm install

ARG CLIENT_ID

ARG AUTHO

ENV CLIENT_ID $CLIENT_ID

ENV AUTHO $AUTHO

COPY . .

CMD [ "npm", "run", "start" ]