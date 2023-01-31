FROM node:16.6.2-bullseye-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

#update package list and install telnet
RUN apt update && apt install telnet

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]