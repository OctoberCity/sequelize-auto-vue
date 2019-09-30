<template>
  <div id="select_template">
    <div class="database_list">
      <el-transfer v-model="value" :data="data"></el-transfer>
      <button @click="commit">确定</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: "MyModal",
    props: {
      modelData: {
        type: Array,
        default: [],
        required: true,
      }, 
    },
    data() {
      return {
        type: '', //1 controller模板选中数据 2 service模板选中数据 
        data: '',
        value: [],
      }
    },
    methods: {
      //处理改变
      commit() { 
        this.$emit("changedata", {
          commitData: this.value
        });
      },
      // 修理数据
      fixInitData() {
        this.data = this.modelData.map((item, index) => {
          return {
            key: index,
            label: item,
            disabled: false
          }
        }); 
      }
    },
    created: function () {
      this.fixInitData();
    }
  }

</script>
<style scoped>
  .database_list {
    margin: 0 auto;
    padding: 0 100px;
    /* background-color: #C7EDCC */
  }

</style>
