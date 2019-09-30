const Controller = require('egg').Controller;
const xlsx = require("node-xlsx"); 

class HomeController extends Controller {
    async index() {
        const obj = xlsx.parse("./1.xls");
        console.log(JSON.stringify(obj[0].data)); 
    }
    async test() {
        const obj = xlsx.parse("../../1.xls");
        console.log(JSON.stringify(obj));
    }
}

module.exports = HomeController;