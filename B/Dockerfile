FROM node:10.6.0
RUN mkdir /myapp
WORKDIR /myapp
COPY  package.json   /myapp/package.json
RUN npm install --register=https://register.npm.taobao.org
COPY .  /myapp 
CMD npm run dev