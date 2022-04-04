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

import {RsaEncrypt} from "../utils/rsa";

export default {

  name: "Login",
  data(){
    return{
      loginForm: {
        username:'lisi',
        password:'123456Aa'
      },
      checked:true,
      rules:{
        username:[{required:true,message:'请输入用户名',trigger:'blur'}],
        password:[{required:true,message:'请输入密码',trigger:'blur'}]
      },
      publicKey:''

    }
  },
  methods:{

    submitLogin(){
      this.$refs.loginForm.validate((valid) =>  {
        if(valid){
          console.log('1u:'+ this.loginForm.username+' '+'p:'+this.loginForm.password)

          this.getRequest('http://localhost:8088/get/publickey').then((resp)=>{
            console.log('publicKey')
            console.log(resp.data.publickey)
            console.log(JSON.stringify(resp.data.publickey))
            if(resp){
              console.log('2u:'+ this.loginForm.username+' '+'p:'+this.loginForm.password)

              this.publicKey=resp.data.publickey;
              //this.publicKey='MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNRfP6ii5AUHpiVUCCfaNoeSV7+1/s6uct9brZK85WWMrM2hi1xZ+0xM+pYZUCmGIM39094Y1vY8x6QjbNFNc6NBBKwWLa1Lsz5PLS1sQhOQ7vnyCNSwNeTfsxNw6agXGqZykTdmxZmCqJAz6dBBr1gTzTXz7yNvrvqu8N1Ky8cwIDAQAB';
              this.login();
            }
          })
        }else{
          console.log("回来了3")
          this.$message.error("请输入所有字段");
          return false;
        }
      });
    },
    login(){

          let Base64 = require('js-base64').Base64
          //let username = Base64.encode(this.loginForm.username);
          //let password = Base64.encode(this.loginForm.password);
         //this.publicKey=Base64.decode(this.publicKey);


          console.log("Base64解码后的公钥："+this.publicKey)
          this.loginForm.username=this.rsaEncrypt(this.loginForm.username,this.publicKey);
          this.loginForm.password=this.rsaEncrypt(this.loginForm.password,this.publicKey);
          console.log('u:'+ this.loginForm.username+' '+'p:'+this.loginForm.password)

          this.postKeyValueRequest('/get/login',this.loginForm).then(resp=>{

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
