<template>
  <div class="index">
    <el-main>
      <el-form :inline="true" :model="databaseInfo" class="demo-form-inline">
        <el-form-item label="数据库">
          <el-input v-model="databaseInfo.database" placeholder="数据库名称："></el-input>
        </el-form-item>
        <el-form-item label="主机">
          <el-input v-model="databaseInfo.host" placeholder="主机:"></el-input>
        </el-form-item>
        <el-form-item label="端口">
          <el-input v-model="databaseInfo.port" placeholder="端口:"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="databaseInfo.username" placeholder="用户名:"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="databaseInfo.password" placeholder="密码:"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>
<script>
  // 请求
  import {
    get
  } from 'api'
  export default {
    data() {
      return {
        databaseInfo: {
          database: '',
          host: '',
          port: '',
          host: '',
          username: '',
          password: '',
        }
      }
    },
    methods: {
      onSubmit() {
        //查询是不是有这个数据库配置，有则跳转至数据详情页面并且更新数据的设置
        const params = this.databaseInfo;
        // get('/database/find', params).then((res) => { 
        //   if (!res.ishave) { 
        //     this.$message({
        //       message: '没有这个数据',
        //       type: 'warning'
        //     });
        //     return;
        //   }
          // 跳跃至列表页面
          this.$router.push({
            name: 'databaseList',
            query: params
          })
        // });
      }
    }
  }

</script>
<style scoped>
  .index {
    width: 100%;
    padding: 200px 0 0 0;
    text-align: center;
  }

</style>
