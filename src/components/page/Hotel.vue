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
                <el-table-column label="酒店名" ref="hotel" prop="hotelName" sortable width="250">
                </el-table-column>               
                <el-table-column prop="address" label="地址" ref="add" :formatter="formatter">
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
                        :total="1000">
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
                    <el-form-item label="酒店编号" >
                        <el-input ref="hotelid" v-model="formLabelAlign.id"></el-input>
                    </el-form-item>
                    <el-form-item label="酒店名称">
                        <el-input ref="hotelName" v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <el-form-item label="酒店地址">
                        <el-input ref="address" v-model="formLabelAlign.region"></el-input>
                    </el-form-item>
                </el-form>
                <div>
                     <el-button type="primary" @click="updata" style="margin-left:35%" >修改</el-button>
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
                    <el-form-item label="酒店编号" >
                        <el-input ref="addhotelid" v-model="formLabelAlign.id"></el-input>
                    </el-form-item>
                    <el-form-item label="酒店名称">
                        <el-input ref="addhotelname" v-model="formLabelAlign.name"></el-input>
                    </el-form-item>
                    <el-form-item label="酒店地址">
                        <el-input ref="insertadd" v-model="formLabelAlign.region"></el-input>
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
    console.log(http)
    export default {

        data() {
            return {
                url: http.url+'/hotel',
            
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
                  region: '',
                  type: '',
                  id:''

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
                        if(d.address.indexOf(self.select_cate) > -1 && 
                            (d.hotelName.indexOf(self.select_word) > -1 ||
                            d.address.indexOf(self.select_word) > -1)
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
                self.axios.post(self.url, {page:self.cur_page}).then((res,req) => {
                    console.log(res,req);
                    self.tableData = res.data.data.results;
                   
                })

            },
            search(){
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row, event) {
               
                console.log(this.$refs.hotelName.$refs.input);
              
                console.log(row);
                this.$refs.hotelid.$refs.input.value = row.id;
                this.$refs.hotelName.$refs.input.value = row.hotelName;//让表单的input表签获取到对应的字段
                this.$refs.address.$refs.input.value = row.address;
                
                this.$refs.edit.style.display = 'block';            
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
                this.axios.post(http.url+'/delhotel',{name:row.hotelName}).then((res)=> {
                    this.getData();
                })
            },
            delAll(){
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].hotelName + ' ';
                    this.axios.post(http.url+'/delhotel',{name:self.multipleSelection[i].hotelName}).then((res)=> {
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
                let hotelName = this.$refs.hotelName.$refs.input.value;
                let address = this.$refs.address.$refs.input.value;
                let id = this.$refs.hotelid.$refs.input.value;
                this.axios.post(http.url+'/updatahotel',{name:hotelName,address:address,id:id}).then((res)=> {
                   console.log(res);
                })
            },
            add(){
                this.$refs.add.style.display = 'block'; 
            }
            ,
            insert(){
                let hotelName = this.$refs.addhotelname.$refs.input.value;
                let address = this.$refs.insertadd.$refs.input.value;
                
                this.status=true;
                
                this.axios.post(http.url+'/inserthotel',{name:hotelName,address:address}).then((res)=> {
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