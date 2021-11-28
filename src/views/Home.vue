<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu  router unique-opened style="background-color:rgb(137,137,137)">
        <el-submenu class="menu" :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
          <template slot="title">
            <i style="color: black;margin-right: 7px;" :class="iconsObj[item.id]" :key="item.id"></i>
            <span class="word">{{item.name}}</span>
          </template>

          <el-menu-item class="menu-item"  :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">
            <i  style="margin-right: 7px;color:black"  :class="iconsObj[child.id]"></i>
            <span class="word">{{child.name}}</span>

          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="homeHeader"  style="text-align: right; font-size: 12px">
        <div>
          <img src="../assets/hf.png" style="width: 150px;height: 150px"/>
          <span class="title">基于Spring Security和OAuth2.0协议的认证系统</span>
        </div>
        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link">{{user.name}}<i> <img src="../assets/face.png" alt="用户头像"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item  command="logout"divided>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main style="background-color: white">
        <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
          <el-breadcrumb-item :to="{ path: '/home' }" >首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="homeWelcome" v-if="this.$router.currentRoute.path=='/home'">
          <div class="wel-contailer">
            <div class="banner-text">
              <div style="text-align: center;">
                <img src="https://gitee.com/li_haodong/picture_management/raw/master/pic/WechatIMG9.png" height="256" width="256" alt="pre系统logo">
              </div>
              <span>

        <img src="https://img.shields.io/badge/spring--boot-2.1.6.RELEASE-green.svg" alt="spring-boot">
        <img src="https://img.shields.io/badge/security-5.1.5-blue.svg" alt="security">
        <img src="https://img.shields.io/badge/mybatis-2.1.0-blue.svg" alt="mybatis-plus">
        </span>
              <br>
              <br>
              <span class="indexword">

            <div>基于Spring Boot 2.1.6.RELEASE</div>
            <div>基于Spring Security 5.1.5</div>
            <br>
            <div>前后端分离架构</div>
            <div>Jwt Token 鉴权机制</div>
            <div>代码注释丰富，极其简洁风格，上手快易理解</div>
            <div>采用Restfull API 规范开发</div>
            <div>统一异常拦截，友好的错误提示</div>
                <br>
            <div>基于注解 + Aop切面实现全方位日记记录系统</div>
            <div>基于Mybatis拦截器 + 策略模式实现数据权限控制</div>
                <br>
            <div>用户管理 、角色管理 、角色管理 、菜单管理 、日志管理、产品管理、订单管理</div>



        </span>
            </div>
          </div>
        </div>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  name: "Home",
  data(){
    return {
      user: JSON.parse(window.sessionStorage.getItem("user")),
      iconsObj: {
        '3': 'fa fa-registered',
        '4': 'fa fa-bars',
        '10': 'fa fa-tachometer',
        '11': 'fa fa-address-card-o',
        '6': 'fa fa-tachometer',
        '7': 'fa fa-tachometer',
        '8': 'fa fa-address-card-o',
        '12': 'fa fa-tachometer',
        '13': 'fa fa-user-circle',
        '14':'fa fa-calendar-minus-o',
        '15':'fa fa-qrcode',
        '16':'fa fa-window-restore',
        '17':'fa fa-calendar-minus-o',
        '18':'fa fa-plus-square-o',
        '19':'fa fa-address-card-o',
        '20': 'fa fa-address-book-o'
  },
      activeNames: ['1', '2'],
      DATA: [],
      text: '',
      actor: '',
      count: 0,
      isText: false
    }
  },
  computed:{
    routes(){
     return this.$store.state.routes;
    }
  },
  methods:{

    commandHandler(cmd){
       if(cmd=='logout'){
         this.$confirm('此操作将注销登录, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
          this.getRequest("/logout")
          //
           // window.sessionStorage.removeItem("user")

           this.$store.commit('initRoutes',[])
           this.$router.replace("/");
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消操作'
           });
         });
       }
    }
  }
}
</script>

<style scoped>
.menu-item{
  background-color:rgb(245,247,250);
}
.menu{
  background-color:rgb(245,247,250);
}


.homeContainer{
  height: 100%;
  position: absolute;

}
.homeAside{
  background-color:rgb(245,247,250);

}
.homeWelcome{

}
.word{
  text-align: center;
  color: rgb(110,111,113);
  font-size: 16px;
  font-weight: bold;
}
.homeHeader{
  background-color:rgb(64,158,255) ;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:0;
  box-sizing: border-box;
  height: 80px!important;

}
.homeHeader div{
  display:flex;
  align-items: center;

}
.homeHeader div span{
 margin-left: 20px;

}
.homeHeader   .title{
  font-size: 30px;

  color: rgb(91,91,91);
}
 .homeHeader .userInfo{
    cursor:pointer;
}
 .el-dropdown-link img{
   width: 48px;
   height: 48px;
   border-radius: 24px;
   margin-left: 8px;
 }
 .el-dropdown-link{
   display: flex;
   align-items: center;
 }
.wel-contailer {
  position: relative;
}

.banner-text {
  position: relative;
  padding: 0 20px;
  font-size: 20px;
  text-align: center;
  color: #333;
}

.banner-img {
  position: absolute;
  top: 0;
  left: 0;

  height: 100%;
  opacity: 0.8;
  display: none;
}
.indexword{
  text-align: center;
  color: rgb(91,91,91);
  font-size: 13px;

}
</style>