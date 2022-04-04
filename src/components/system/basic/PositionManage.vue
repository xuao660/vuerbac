<template>
  <div>
    <div class="posinput">
      <el-input v-model="pos.name" placeholder="添加职位"  prefix-icon="el-icon-plus" size="small" style="width:300px;margin-right: 10px"></el-input>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addPosition">添加</el-button>
    </div>
    <div>
      <el-table
          :data="positions"
          @selection-change="handleSelectionChange"
          border
          stripe
          size="small"
          style="width: 80%">
        <el-table-column
            type="selection"
            width="60">
        </el-table-column>
        <el-table-column
            prop="id"
            label="编号"
            width="60">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职位名称"
            width="80">
        </el-table-column>
        <el-table-column
            prop="createDate"
            width="150"
            label="创建时间">
        </el-table-column>
        <el-table-column
            label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="showEditPos(scope.$index, scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" size="small" @click="deleteByIds" style="margin-top:10px" :disabled="selection==0">批量删除</el-button>
      <el-dialog
          title="修改职位"
          :visible.sync="dialogVisible"
          width="30%">
        <div>
          <el-tag>职位名称</el-tag>
          <el-input v-model="updatePos.name" size="small"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="doUpdate" size="small">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>
<script>
import {getRequest, putRequest} from "../../../utils/api";

export default {
  name: "PositionManage",
  data(){
    return{
      pos:{
        name:''
      },
      selection:[],
      dialogVisible:false,
      positions:[],
      updatePos:{
        id:'',
        name:''
      }
    }
  },
  mounted() {
    this.initPositions();
  },
  methods:{
    deleteByIds(){
      this.$confirm('此操作将永久删除【'+this.selection.length+'】条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids='?';
        this.selection.forEach(item=>{
          ids+='ids='+item.id+'&';
        })
        console.log('ids:'+ids);
        this.deleteRequest("/sys/basic/pos/"+ids).then(resp=>{
          if(resp){
            this.initPositions();

          }
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleSelectionChange(val){
      this.selection=val
      console.log(val);
    },
    showEditPos(index,data){
      Object.assign(this.updatePos,data);
      console.log("name:"+this.updatePos.name+"   id:"+this.updatePos.id)

      this.dialogVisible=true;
    },
    doUpdate(){
      this.putRequest("/sys/basic/pos/",this.updatePos).then(resp=>{
        if(resp){
          this.initPositions();
          this.updatePos.name='';
          this.dialogVisible=false;
        }
      })
    },
    deleteMassage(data) {
      this.$confirm('此操作将永久删除职位【'+data.name+'】, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/sys/basic/pos/"+data.id).then(resp=>{
          if(resp){
            this.initPositions();

          }
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    addPosition(){
      if(this.pos.name){
        this.postRequest("/sys/basic/pos/",this.pos).then(resp=>{
          if(resp){
            this.initPositions();
            this.pos.name='';
          }
        });
      }else{
        this.$message.error('职位名称不能为空');
      }
    },

    handleDelete(index,data){
      this.deleteMassage(data);
    },
    initPositions(){
      this.getRequest("/sys/basic/pos/").then(resp=>{
        if(resp){
          this.positions=resp;
        }
      });
    }
  }
}
</script>

<style scoped>
.posinput{
  margin-bottom: 20px;
}
</style>
