FROM node:14

WORKDIR /app

COPY /package.json .

RUN npm install

COPY . .

RUN npm run client-install

EXPOSE 3000

CMD [ "npm", "run", "dev" ]