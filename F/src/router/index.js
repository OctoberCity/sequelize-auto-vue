import Vue from 'vue'
import Router from 'vue-router'
import index from 'page/index/'
import DatabaseList from 'page/databaseList/' 


Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      component: index,
      name:'index'
    },
    {
      path: '/database',
      component: DatabaseList,
      name:'databaseList'
    },
   








  ]
})

export default router;
