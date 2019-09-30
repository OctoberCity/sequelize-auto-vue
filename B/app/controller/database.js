const Controller = require('egg').Controller;
const Sequlize = require('sequelize');
const pump = require('mz-modules/pump');
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const nunjucks = require('nunjucks');
const {
    PassThrough
} = require('stream');


class databaseController extends Controller {
    async index() {
        const {
            service,
            ctx
        } = this;
        const params =  ctx.request.query;
        console.log(params);
        //  {
        //     database: 'keyan',
        //     host: '192.168.17.194',
        //     password: 'Juzhiyuan123.',
        //     username: 'root'
        // }

        const sequlize = new Sequlize(params.database, params.username, params.password, {
            host: params.host,
            dialect: 'mysql'
        });
        let databaseList = await service.database.find(sequlize);
        databaseList = databaseList.map((item) => {
            return item.table_name
        });
        return ctx.body = {
            code: 1001,
            msg: '获取database成功',
            data: databaseList
        };
    }

    async makefile() {
        const {
            ctx
        } = this;
        const {
            controller,
            service
        } = ctx.request.query;
        const archive = archiver('zip');
        let contrArr = controller.split(',');
        let serviceArr = service.split(',');
        try {
            contrArr.forEach((item) => {
                item = item.replace(/([^_])(?:_+([^_]))/g, function ($0, $1, $2) {
                    return $1 + $2.toUpperCase();
                }); 
                const pss = new PassThrough();
                const filepath = path.join(__dirname, `../public/controller/${item}.js`);
                const ws = fs.createWriteStream(filepath);
                const render = nunjucks.render(path.join(__dirname, '../public/template/controller.js'), {
                    name: item
                })
                const renderBuffer = Buffer.from(render, 'utf-8');
                pss.end(renderBuffer).pipe(ws);

            });
            serviceArr.forEach((item) => {
                item = item.replace(/([^_])(?:_+([^_]))/g, function ($0, $1, $2) {
                    return $1 + $2.toUpperCase();
                });
                const pss = new PassThrough();
                const filepath = path.join(__dirname, `../public/service/${item}.js`);
                const ws = fs.createWriteStream(filepath);
                const render = nunjucks.render(path.join(__dirname, '../public/template/service.js'), {
                    name: item
                })
                const renderBuffer = Buffer.from(render, 'utf-8');
                pss.end(renderBuffer).pipe(ws);

            });
            const output = new PassThrough(); // 压缩流  
            archive.directory(path.join(__dirname, '../public/controller/'), 'controller');
            archive.directory(path.join(__dirname, '../public/service/'), 'service');
            archive.finalize();
            // 将压缩流写入输出通道中
            archive.pipe(output);
            ctx.type = 'application/zip';
            ctx.set('Content-disposition', 'attachment; archive-name.zip');
            ctx.body = output;
        } catch (err) {
            console.log(err);
        }

    }
    // 上传文件
    async uploadfile() {
        const {
            ctx
        } = this
        try {
            const stream = await ctx.getFileStream();
            const params = stream.fields;
            let importpath = '../public/template/controller.js';
            if (params.type === 2 + '') {
                importpath = '../public/template/service.js';
            }
            const writeStream = fs.createWriteStream(path.join(__dirname, importpath));
            await pump(stream, writeStream);
            return ctx.body = {
                code: 1001,
                msg: '上传成功',
            };
        } catch (error) {
            return ctx.body = {
                code: 1003,
                msg: '上传失败'
            };
        }

    }
}

module.exports = databaseController;