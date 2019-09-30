module.exports = app => {
    const {
        router,
        controller
    } = app;
    router.get('/database/find', controller.database.index);

    router.post('/database/uploadfile', controller.database.uploadfile);
    // 下载模板的压缩文件
    router.get('/database/getFinallyFile', controller.database.makefile);

};