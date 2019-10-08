module.exports = (app) => {
    const config = exports = {
        keys: '111111111',

        // 跨域配置
        security: {
            csrf: {
                enable: false,
                ignoreJSON: true
            },
        },
        cors: {
            credentials: true,
            origin: '*',//'http://127.0.0.1:8080',
            allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
        },
        // 阿里node性能平台
        alinode: {
            appid: '81016',
            secret: '29488989a760f20f3d8913e55aedcb540a048d5e',
        },
        //数据库 
        sequelize: {
            dialect: 'mysql',
            host: '192.168.17.180',
            port: 3306,
            database: 'play',
            username: 'hjw',
            password: '123456'
        },
        //文件上传设置
         multipart :{
            autoFields: true,
            defaultCharset: 'utf8',
            fieldNameSize: 100,
            fieldSize: '100kb',
            fields: 100,
            fileSize: '2048mb',
            files: 100,
            fileExtensions: [ 'js' ],
          }
    }
    return config;
};