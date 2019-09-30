<template>
  <div class="database">
    <div class="upload_block">
      <h2>controller模板</h2>
      <el-upload class="upload-demo" action="doUpload" :before-upload="beforeUpload" drag multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip" @click="openDialog(1)">选择模板适配表格</div>
      </el-upload>
      <h2>service模板</h2>
      <el-upload class="upload-demo" action="doUpload" :before-upload="beforeUpload" drag multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip" @click="openDialog(2)">选择模板适配表格</div>
      </el-upload>
      <button @click="makefile">开始下载代码文件</button>
    </div>
    <el-dialog title="选择表" :visible.sync="dialogVisible" width="50%">
      <SelectModel :modelData='modelData' @changedata='selectListchange'></SelectModel>
    </el-dialog>
  </div>
</template>
<script>
  // 请求
  import {
    get,
    upfrom,
    getfile
  } from 'api'
  import SelectModel from './selectModel'
  export default {
    data() {
      return {
        databaseInfo: '',
        /**controller，service的选中表渲染表**/
        controllerList: '',
        serviceList: '',
        modelData: '', // 弹出层所需的数据
        selectValue: '', // 弹出层记录选中的数据
        dialogVisible: false, //弹出层状态
        modelType: '', // 数据处理是controller :1还是service:2层 
      }
    },
    components: {
      SelectModel
    },
    methods: {
      init() {
        this.databaseInfo = this.$route.query;
        console.log( this.databaseInfo  );

        this.controllerList = [];
        this.serviceList = [];
        this.getDataBase();
      },
      // 获得数据库的表列表
      getDataBase() {
        get('/database/find', this.databaseInfo).then((res) => {
          this.modelData = res;
        });
      },
      // 处理模态框数据选中，改变
      selectListchange(obj) {
        if (this.modelType === 1) {
          this.controllerList = obj.commitData;
        } else {
          this.serviceList = obj.commitData;
        }
        // 关闭模态框
        this.dialogVisible = false;
      },
      // 打开模态框
      openDialog(type) {
        this.modelType = type;
        this.dialogVisible = true;
      },
      // 上传文件 
      beforeUpload(file) {
        let fd = new FormData();
        fd.append('file', file); //传文件 
        fd.append('type', this.modelType);
        upfrom('/database/uploadfile', fd).then(function (res) {

        })
        return false
      },
      // 生成文件
      makefile() {
        const controllerList = this.controllerList.map((item) => {
          return this.modelData[item]
        });
        const serviceList = this.controllerList.map((item) => {
          return this.modelData[item]
        });

        const params = {
          controller: controllerList + '',
          service: serviceList + '',
        }
        getfile('/database/getFinallyFile', params).then((res) => {
          const content = res
          const blob = new Blob([content], {
            type: 'application/zip'
          })
          const fileName = '导出压缩包.zip'
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        });
      }


    },
    created: function () {
      this.init();
    }
  }

</script>
<style scoped>
  .database {
    width: 100%;
    padding: 200px 0 0 0;
  }

  h2 {
    margin-bottom: 20px;
    padding-right: 300px;
  }

  .upload_block {
    margin: 0 auto;
    text-align: center;
  }

  .upload-demo {
    margin-bottom: 30px;
  }

</style>
