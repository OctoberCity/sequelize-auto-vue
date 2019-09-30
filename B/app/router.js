module.exports = app => {
    const {
        router,
        controller
    } = app;
    router.get('/', controller.home.index);
    require('./router/database.js')(app);
};