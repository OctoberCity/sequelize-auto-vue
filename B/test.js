const nunjucks = require('nunjucks');

const res=nunjucks.render('./app/public/controller/2.js', {
    name: 'James'
})
console.log(res);