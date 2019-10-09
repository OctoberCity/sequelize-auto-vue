# sequelize-auto-vue
根据提供的模板生成controller,service,可选多表



#### 前端，后端启动
cd  B(后端)
npm i  
npm run dev

cd F(前端)
npm i
npm run dev 


浏览器访问 http://127.0.0.1:8080


#### docker-compose启动

docker-compose build
docker-compose up 
浏览器访问 http://ip:ports


#### 页面使用
1. 填写渲染的数据连接信息
2. 上传模板文件
3. 勾选渲染模板文件的数据库表明
4. 下载渲染之后的压缩文件zip


#### 最后
该项目不是一个比较好的功能，只是在工作中做egg类似的项目,修改 [sequelize-auto](https://github.com/sequelize/sequelize-auto)的源码，达到这个项目一样的效果，后来闲下来，想快速进行页面操作页面操作，就抽空搞来一下。
做项目中node给我的感觉就是能利用手头的事节约一些事，可能在java中这种功能已经存在，但是node能快速自定义的完成一些事情，我很喜欢这样，很满足。

#### 要做的事（可能不会做，看心情）
1. 简化包，代码
2. 改成后端渲染，做成另外一个分支
