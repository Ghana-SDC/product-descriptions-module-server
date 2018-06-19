FROM node:8.11

WORKDIR /Users/kylemccarty/Desktop/gitTest/product-descriptions-FEC

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 2112

CMD [ "npm", "start", "run build" ]