FROM node
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm" , "run" , "startDev"]