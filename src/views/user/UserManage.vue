<template>
  <div>
    <div style="margin-top: 10px;display: flex;justify-content: center">
      <el-input v-model="keywords" placeholder="通过用户名搜索用户..." prefix-icon="el-icon-search"
                style="width: 400px;margin-right: 10px" @keydown.enter.native="doSearch"></el-input>
      <el-button icon="el-icon-search" type="primary" @click="doSearch">搜索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">
        添加用户
      </el-button>
    </div>
    <div class="user-container">
      <el-card class="user-card" v-for="(user,index) in users" :key="index" v-if="user.username!='admin'">
        <div slot="header" class="clearfix">
          <span>{{user.name}}</span>
          <el-button style="float: right; padding: 3px 0;color: #e30007;" type="text"
                     icon="el-icon-delete" @click="deleteUser(user)"></el-button>
        </div>
        <div>
          <div class="img-container">

            <i> <img src="../../assets/face2.png" alt="用户头像" class="userface-img"></i>
          </div>
          <div class="userinfo-container">
            <div>用户名：{{user.name}}</div>
            <div>手机号码：{{user.phone}}</div>
            <div>性别：{{user.gender}}</div>
            <div>生日：{{user.birthday}}</div>
            <div>地址：{{user.address}}</div>
            <div>用户角色：
              <el-tag type="success" style="margin-right: 4px" v-for="(role,indexj) in user.roles"
                      :key="indexj">{{role.nameZh}}
              </el-tag>

            </div>
          </div>
        </div>
      </el-card>

    </div>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="80%">
      <div>
        <el-form :model="user" :rules="rules" ref="userForm">
          <el-row>
            <el-col :span="6">
              <el-form-item label="姓名:" prop="name">
                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="user.name"
                          placeholder="请输入员工姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="性别:" prop="gender">
                <el-radio-group v-model="user.gender">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="出生日期:" prop="birthday">
                <el-date-picker
                    v-model="user.birthday"
                    size="mini"
                    type="date"
                    value-format="yyyy-MM-dd"
                    style="width: 150px;"
                    placeholder="出生日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="联系地址:" prop="address">
                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                          v-model="user.address" placeholder="请输入联系地址"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="电话号码:" prop="phone">
                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-phone"
                          v-model="user.phone" placeholder="请输入手机号码" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="账号:" prop="username">
                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                          v-model="user.username" placeholder="请输入账号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="密码:" prop="password">
                <el-input size="mini" type="password" style="width: 200px" prefix-icon="el-icon-edit"
                          v-model="user.password" placeholder="请输入密码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doAddEmp">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UserManage",
  mounted() {
    this.initUsers();
  },
  data() {
    return {
      keywords: '',
      users: [],
      dialogVisible: false,
      title:'',
      user : {
        name: "",
        gender: "",
        birthday: "",
        phone: "",
        address: "",
        username: "",
        password:""

      },
      rules: {
        name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
        birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],

        phone: [{required: true, message: '请输入手机号码', trigger: 'blur'},{
          pattern:'^1[3-9]\\d{9}$',
          message:'请输入正确格式的手机号码',
          trigger:'blur'
        }],
        // email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}, {
        //   type: 'email',
        //   message: '邮箱格式不正确',
        //   trigger: 'blur'
        // }],

        address: [{required: true, message: '请输入用户地址', trigger: 'blur'}],
        username:[{required:true,message: '请输入用户名', trigger: 'blur'}],
        password:[{required:true,message: '请输入密码', trigger: 'blur'},{
          pattern:'^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,12}$',
          message:'密码应六位以上且包括数字和字母大小写',
          trigger:'blur'
        }]
      }
    }
  },

  methods: {
    emptyEmp() {
      this.user = {
        name: "",
        gender: "",
        birthday: "",
        idCard: "",
        wedlock: "",
        email: "",
        phone: "",
        address: "",
        workID: "",

      }
    },
    doAddEmp() {
      if (this.user.id) {
        this.$refs['userForm'].validate(valid => {
          if (valid) {
            this.putRequest("/user/manage/", this.user).then(resp => {
              if (resp) {
                this.dialogVisible = false;
                this.initEmps();
              }
            })
          }
        });
      } else {
        this.$refs['userForm'].validate(valid => {
          if (valid) {
            this.postRequest("/user/manage/", this.user).then(resp => {
              if (resp) {
                this.dialogVisible = false;
                this.initUsers();
              }
            })
          }
        });
      }
    },

    showAddEmpView() {
      this.emptyEmp();
      this.title = '添加员工';

      this.dialogVisible = true;
    },
    deleteUser(user) {
      this.$confirm('此操作将永久删除【' + user.name + '】, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/user/manage/" + user.id).then(resp => {
          if (resp) {
            this.initUsers();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    doSearch() {
      this.initUsers();
    },
    initUsers() {
      this.getRequest("/user/manage/?keywords=" + this.keywords).then(resp => {
        if (resp) {
          this.users = resp;
        }
      })
    }
  }
}
</script>

<style>
.userinfo-container div {
  font-size: 12px;
  color: #409eff;
}

.userinfo-container {
  margin-top: 20px;
}

.img-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.userface-img {
  width: 72px;
  height: 72px;
  border-radius: 72px;
}

.user-container {
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.user-card {
  width: 350px;
  margin-bottom: 20px;
}
</style>