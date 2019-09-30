'use strict';

const Service = require('egg').Service;
class databaseService extends Service {
    async find(sequlize) {
        const {
            app
        } = this;
        //查询表明 
        const sql = `select table_name from information_schema.tables where table_schema= '${sequlize.config.database}'`;
        const databaselist = await sequlize.query(sql, {
            type: 'SELECT'
        }); 
        return databaselist;
    }













}
module.exports = databaseService;