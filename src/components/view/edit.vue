<template>
  <div class="edit">
    <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>
    <div style="margin: 20px;"></div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="酒店名称">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="酒店地址">
        <el-input v-model="formLabelAlign.region"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    name: 'edit',
    data() {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    },
    methods:{
        getDataName(){
            let self = this;
            self.axios.get(self.url).then((res) => {
                self.formLabelAlign.name = res.data.data.results;
                console.log(res.data.data.results);
            })
        },
        getAddress(){
            let self = this;
            self.axios.get(self.url).then((res) => {
                self.formLabelAlign.region = res.data.data.results;
            })
        }
    }
  }
</script>

<style scoped>
  .edit{
    display:none;
    z-index:999;
    margin:100px auto;
    width:500px;

  }
</style>