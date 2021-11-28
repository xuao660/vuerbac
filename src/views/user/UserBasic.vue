<template>
  <div>
    <div style="margin-top: 10px;display: flex;justify-content: center">
      <el-input v-model="keywords" placeholder="通过用户名搜索用户..." prefix-icon="el-icon-search"
                style="width: 400px;margin-right: 10px" @keydown.enter.native="doSearch"></el-input>
      <el-button icon="el-icon-search" type="primary" @click="doSearch">搜索</el-button>
    </div>
    <div class="user-container">
      <el-card class="user-card" v-for="(user,index) in users" :key="index" v-if="user.username!='admin'">
        <div slot="header" class="clearfix">
          <span>{{user.name}}</span>

        </div>
        <div>
          <div class="img-container">

            <i> <img src="../../assets/face2.png" alt="用户头像" class="userface-img"></i>
          </div>
          <div class="userinfo-container">
            <div>用户名：{{user.name}}</div>
            <div>手机号码：{{user.phone}}</div>
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
  </div>
</template>

<script>
export default {
  name: "UserBasic",
  data() {
    return {
      keywords: '',
      users: [],
      selectedRoles: [],
      allroles: []
    }
  },
  mounted() {
    this.initUsers();
  },
  methods: {

    doSearch() {
      this.initUsers();
    },
    hidePop(user) {
      let roles = [];
      Object.assign(roles, user.roles);
      let flag = false;
      if (roles.length != this.selectedRoles.length) {
        flag = true;
      } else {
        for (let i = 0; i < roles.length; i++) {
          let role = roles[i];
          for (let j = 0; j < this.selectedRoles.length; j++) {
            let sr = this.selectedRoles[j];
            if (role.id == sr) {
              roles.splice(i, 1);
              i--;
              break;
            }
          }
        }
        if (roles.length != 0) {
          flag = true;
        }
      }
      if (flag) {
        let url = '/role/basic/role?uid=' + user.id;
        this.selectedRoles.forEach(sr => {
          url += '&rids=' + sr;
        });
        this.putRequest(url).then(resp => {
          if (resp) {
            this.initUsers();
          }
        });
      }
    },
    showPop(user) {
      this.initAllRoles();
      let roles = user.roles;
      this.selectedRoles = [];
      roles.forEach(r => {
        this.selectedRoles.push(r.id);
      })
    },
    initAllRoles() {
      this.getRequest("/role/basic/roles").then(resp => {
        if (resp) {
          this.allroles = resp;
        }
      })
    },
    initUsers() {
      this.getRequest("/role/basic/?keywords="+this.keywords).then(resp => {
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