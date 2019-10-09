FROM node:10.6.0
RUN mkdir /myapp
WORKDIR /myapp
COPY  /B/package.json   /myapp/package.json
RUN npm install --register=https://register.npm.taobao.org
EXPOSE 7001
COPY /B  /myapp 
CMD npm run dev
