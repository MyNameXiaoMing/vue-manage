<template>
    <div>
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                    <el-breadcrumb-item>基础表格</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll(index, row)">批量删除</el-button>
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-button type="primary"  @click="add">增加条目</el-button>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" >
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="会员性名" ref="nickname" prop="nickname" sortable width="150">
                </el-table-column>
                <el-table-column label="会员性别" ref="gender" prop="gender" sortable width="150">
                </el-table-column>                 
                <el-table-column prop="birthday" label="会员生日" ref="birthday" :birthday="birthday">
                </el-table-column>  
                <el-table-column prop="telephone" label="联系方式" ref="telephone">
                </el-table-column>                 
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="small"
                                @click.stop="handleEdit(scope.$index, scope.row, $event)">编辑</el-button>
                        <el-button size="small" type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                
                </el-table-column>

            </el-table>
            <div class="pagination">
                <el-pagination
                        @current-change ="handleCurrentChange"
                        layout="prev, pager, next"
                        :page-size="pagesize"
                        :total= 1000>
                </el-pagination>
            </div>

            <div class="edit" ref='edit' :center="true">
                <el-radio-group v-model="labelPosition" size="small">
                    <el-radio-button label="left">左对齐</el-radio-button>
                    <el-radio-button label="right">右对齐</el-radio-button>
                    <el-radio-button label="top">顶部对齐</el-radio-button>
                </el-radio-group>
                <div style="margin: 20px;"></div>
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" :center="true">
                    <el-form-item label="会员编号" >
                        <el-input ref="menberid" v-model="formLabelAlign.id"></el-input>
                    </el-form-item>
                    <el-form-item label="会员姓名">
                        <el-input ref="menbername" v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" >
                        <el-input ref="gender" v-model="formLabelAlign.gender"></el-input>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-input ref="birthday" v-model="formLabelAlign.birthday"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input ref="telephone" v-model="formLabelAlign.telephone"></el-input>
                    </el-form-item>
                </el-form>
                <div>
                     <el-button type="primary" @click="updata" style="margin-left:35%" :loading="status">修改</el-button>
                    <el-button type="danger" @click="close">取消修改</el-button>
                </div> 
            </div>

            <div class="add" ref='add' :center="true">
                <el-radio-group v-model="labelPosition" size="small">
                    <el-radio-button label="left">左对齐</el-radio-button>
                    <el-radio-button label="right">右对齐</el-radio-button>
                    <el-radio-button label="top">顶部对齐</el-radio-button>
                </el-radio-group>
                <div style="margin: 20px;"></div>
                <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
                    <el-form-item label="会员编号" >
                        <el-input ref="addmenberid" v-model="formLabelAlign.id"></el-input>
                    </el-form-item>
                    <el-form-item label="会员名字">
                        <el-input ref="addmenbername" v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" >
                        <el-input ref="addgender" v-model="formLabelAlign.gender"></el-input>
                    </el-form-item>
                    <el-form-item label="生日">
                        <el-input ref="addbirthday" v-model="formLabelAlign.birthday"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式">
                        <el-input ref="insertel" v-model="formLabelAlign.telephone"></el-input>
                    </el-form-item>
                </el-form>
                <div>
                     <el-button type="primary" @click="insert" style="margin-left:35%" :loading="status" >添加</el-button>
                    <el-button type="danger" @click="close">取消</el-button>
                </div> 
            </div>
        </div>
        
    </div>
</template>



<script>
    import http from '../../http/baseurl.js';
    export default {
        data() {
            return {
                url: http.url+'/user',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                status:false,
                pagesize: 10,

                labelPosition: 'right',
                formLabelAlign: {
                  name: '',
                  gender: '',
                  telephone: '',
                  id:'',
                  birthday:''

                }
            }
            
        },
        mounted(){
            let edit = this.$refs.edit;
        },
        created(){
            this.getData();
        },
        computed: {
            data(){
                const self = this;
                return self.tableData.filter(function(d){
                    let is_del = false;
                    /*for (let i = 0; i < self.del_list.length; i++) {
                        if(d.hotelName === self.del_list[i].hotelName){
                            is_del = true;
                            break;
                        }
                    }*/
                    for (let i = 0; i < self.del_list.length; i++) {
                        if(d.id === self.del_list[i].id){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                        if(d.telephone.indexOf(self.select_cate) > -1 && 
                            (d.nickname.indexOf(self.select_word) > -1 ||
                            d.telephone.indexOf(self.select_word) > -1)
                        ){
                            return d;
                        }
                    }
                })
                return data;
            }
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                self.axios.post(self.url, {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.data.results;
                    console.log(res);
                })

            },
            search(){
                this.is_search = true;
            },
            birthday(row, column) {
                console.log(row);
                return row.birthday;
            },

            handleEdit(index, row, event) {
            
                this.$refs.menberid.$refs.input.value = row.id;
                this.$refs.menbername.$refs.input.value = row.nickname;//让表单的input表签获取到对应的字段
                this.$refs.telephone.$refs.input.value = row.telephone;
                this.$refs.gender.$refs.input.value = row.gender;
                this.$refs.birthday.$refs.input.value = row.birthday;
                
                this.$refs.edit.style.display = 'block';            
            },
            handleDelete(index, row) {
                
                this.axios.post(http.url+'/deluser',{id:row.id}).then((res)=> {
                    this.getData();
                })
            },
            delAll(){
                const self = this,
                length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].telephone + ' ';
                    console.log(self.multipleSelection[i]);
                    this.axios.post(http.url+'/deluser',{telephone:self.multipleSelection[i].telephone}).then((res)=> {
                        this.getData();
                    })
                }
                self.$message.error('删除了'+str);
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            close(){
                this.$refs.edit.style.display = 'none';
                this.$refs.add.style.display = 'none';  
            },
            updata(){
                console.log(event);
                let menbername = this.$refs.menbername.$refs.input.value;
                let telephone = this.$refs.telephone.$refs.input.value;
                let gender = this.$refs.gender.$refs.input.value;
                let birthday = this.$refs.birthday.$refs.input.value;
                let id = this.$refs.menberid.$refs.input.value;
                this.axios.post(http.url+'/updatauser',{name:menbername,telephone:telephone,gender:gender,birthday:birthday,id:id}).then((res)=> {
                    this.status=false;
                    this.$message.error('更新完成');
                    console.log(res);
                })
            },
            add(){
                this.$refs.add.style.display = 'block'; 
            },
            insert(){
                let menbername = this.$refs.addmenbername.$refs.input.value;
                let insertel = this.$refs.insertel.$refs.input.value;
                let gender = this.$refs.addgender.$refs.input.value;
                let birthday = this.$refs.addbirthday.$refs.input.value;
                let id = this.$refs.addmenberid.$refs.input.value;
                this.status=true;
                
                this.axios.post(http.url+'/insertuser',{name:menbername,telephone:insertel,gender:gender,birthday:birthday}).then((res)=> {
                   console.log(res);
                        this.status=false;
                        this.$message.error('添加完成');
                })
            }

        }
    }
</script>


<style scoped>
.table{
    position:relative;
}
.handle-box{
    margin-bottom: 20px;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}

.edit{
    display:none;
    background:#fff;
    position:absolute;
    width:500px;

    border:1px solid #ccc;
    z-index:999;
    top:50%;
    left:50%;
    margin-left:-250px;
    margin-top:-135px;
        padding:50px;
}

.add{
    display:none;
    background:#fff;
    position:absolute;
    width:500px;

    border:1px solid #ccc;
    z-index:999;
    top:50%;
    left:50%;
    margin-left:-250px;
    margin-top:-135px;
        padding:50px;
}
</style>