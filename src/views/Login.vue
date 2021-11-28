<template>
  <div class="login">
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer" >
      <h3 class="loginTitle">系统登陆</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" aria-placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" @keydown.enter.native="submitLogin"/>
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember"></el-checkbox>
      <el-button type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>

export default {

  name: "Login",
  data(){
    return{
      loginForm: {
        username:'admin',
        password:'123'
      },
      checked:true,
      rules:{
        username:[{required:true,message:'请输入用户名',trigger:'blur'}],
        password:[{required:true,message:'请输入密码',trigger:'blur'}]
      }
    }
  },
  methods:{
    submitLogin(){
      this.$refs.loginForm.validate((valid) =>  {
        if(valid){
          let Base64 = require('js-base64').Base64
          let username = Base64.encode(this.loginForm.username);
          let password = Base64.encode(this.loginForm.password);
          console.log('u:'+username+' '+'p:'+password)
          username=username.split("").reverse().join("");
          password=password.split("").reverse().join("");
          this.loginForm.username=username;
          this.loginForm.password=password;
          console.log('u:'+username+' '+'p:'+password)
          // this.getRequest('/get/login?username='+username+'&password='+password).then(resp=>{
          this.postKeyValueRequest('/get/login?',this.loginForm).then(resp=>{

            console.log('发送登录请求')
            if(resp){
              console.log('cookie')

              console.log(document.cookie);
              window.sessionStorage.setItem('user',JSON.stringify(resp.data.user));
              console.log(JSON.parse(sessionStorage.getItem('user')));
              window.sessionStorage.setItem('token',JSON.stringify(resp.data.token))
              console.log(Date.now())

              let time=Date.now()+20*1000;
              console.log(time)

              window.localStorage.setItem('time',time.toString())
            //  this.$store.commit('newToken',JSON.stringify(resp.data.token));
              console.log('token信息：'+sessionStorage.getItem('token'));
              let path=this.$route.query.redirect;
              this.$router.replace((path=='/' || path==undefined)?'/home':path)
             // this.$store.commit('access_token','token_access')
            }else{
              console.log("回来了2")



            }
          })
          // alert('提交登陆表单');
        }else{
          console.log("回来了3")

          this.$message.error("请输入所有字段");
          return false;
        }
      });

    }
  }
}
</script>

<style>
.login {
   display: flex;
   justify-content: center;
   align-items: center;
   height: 100%;
   background-image: url("../assets/img_1.png");
   background-size: cover;
}

  .loginContainer{
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width:350px;
    padding:15px 15px 15px 15px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    background-color:#ffffff;
  }
  .loginTitle{
    margin:10px auto 20px auto;
    text-align: center;
    color:#505458;
  }
  .loginRemember{
    margin:0 0 20px 0;
  }
</style>