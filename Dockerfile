FROM node:8.11

WORKDIR /sdc

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 2112

CMD [ "npm", "start", "run build" ]