import axios from 'axios'
import { Message } from 'element-ui';
import router from '../router'
import store from '../store'

axios.interceptors.request.use(config =>{
  //  let user= JSON.parse(window.sessionStorage.getItem('user'));
    console.log('进入request拦截');
    console.log('config：'+config.url);
    let index = config.url.indexOf('?');
    let requestUrl='';
    console.log('index:'+index)
    if(index==-1){
         requestUrl=config.url;
    }else{
         requestUrl = config.url.substring(0,index);

    }
    console.log('requestUrl:'+requestUrl)

    if(requestUrl=='/get/login'){
        console.log('登录请求');
        console.log(document.cookie);
        console.log(document.cookie.split(";")[0].split("=")[1]);
        config.headers['X_XSRF_TOKEN'] = document.cookie.split(";")[0].split("=")[1];
        window.sessionStorage.removeItem('token');
        return config;
    }
    if(requestUrl   =='http://localhost:8088/oauth/token'){
        console.log('刷新token请求');
        window.sessionStorage.removeItem('token');
        return config;
    }
    if(requestUrl  =='http://localhost:8088/get/publickey'){
        console.log('获取公钥请求');
        return config;
    }
    if(config.url== '/logout'){
        console.log('登出请求');
        window.sessionStorage.removeItem('token');
        window.sessionStorage.setItem('user',null);
        return config;
    }
    let token=JSON.parse(sessionStorage.getItem('token'));
    // console.log('api中token:'+token)

    if(token){
        console.log('进入if(token)');

        let time=window.localStorage.getItem('time');
        let now=Date.now();
        console.log('time:'+time)
        console.log('now:'+Date.now())
        if(time<=now){

                return refreshTokenRequest(router.currentRoute.path,false,config).then(res =>{
                    console.log('进入then（）')
                    token=JSON.parse(sessionStorage.getItem('token'));
                    config.headers.Authorization = 'Bearer '+token.access_token;
                    console.log('打印then中的token：'+token.access_token)
                    console.log('打印then中的url：'+config.url)
                    return config;
                }).catch(res => {
                    console.error('refresh token error: ')
                })
            token=JSON.parse(sessionStorage.getItem('token'));
            config.headers.Authorization = 'Bearer '+token.access_token;
            console.log('if中发送的请求：'+config.url+' token:'+token.access_token)
        }else{
            token=JSON.parse(sessionStorage.getItem('token'));
            if(token.access_token){

                console.log(config.url+'  添加token：'+token.access_token);
                config.headers.Authorization = 'Bearer '+token.access_token;
            }
            console.log(config)
            return config;
        }
    }
    console.log('将发送请求:'+config.url+' token:'+token.access_token)

},error=>{
    return Promise.reject(error)
})

axios.interceptors.response.use(success=>{
    console.log('进入reponse success拦截');
    console.log(success)
    if(success.status &&success.status==200 && success.data.status==500){
        Message.error({ message : success.data.msg})
        return;
    }
    if(success.data.msg){
        Message.success({message:success.data.msg})
    }
    return success.data;
},error=>{
    console.log('进入reponse error拦截');
    console.log('打印error：'+error);

    console.log('打印JSONerror：'+JSON.stringify(error.response.data));
    console.log('打印JSONerror：'+JSON.stringify(error.response.data.status));

    if(error.response.data.status==504 || error.response.data.status==404){
        Message.error({message:'服务器呢？？！！'})
    }else if(error.response.data.status==403){
        Message.error({message: '有权限吗你？！'})
        router.replace('/home')
    }else if(error.response.data.status==500){
        Message.error({message:'...登录了吗！？'})
        router.replace('/')
    }else if(error.response.data.status==401){
        console.log("当前路径名："+router.currentRoute.name)
        console.log("当前路径："+router.currentRoute.path)
        if(router.currentRoute && router.currentRoute.name!='login'){
           // refreshTokenRequest(router.currentRoute.path,true);
            console.log('旧tokken导致的跳转')
            //router.replace(router.currentRoute.path)

        }else{
            Message.error({message:'...认证了吗！？'})
            router.replace('/')
        }

    } else{

            console.log(error)
            Message.error({message:'奇怪的错误！？'})
            router.replace('/home')

    }
    return;
})
let base='';

 async function refreshTokenRequest(path,flag,config){
    let data;
    let token=JSON.parse(sessionStorage.getItem('token'));
    console.log('refresh_token:'+token.refresh_token)
    let refresh_token=token.refresh_token;
    console.log("打印refresh_token:"+refresh_token)
    console.log("发送刷新token请求。。。")

    let url="http://localhost:8088/oauth/token?grant_type=refresh_token&client_id=client_2&client_secret=123&refresh_token="+refresh_token


        await  postKeyValueRequest(url).then(resp =>{
            if(resp){
                console.log("打印resp："+JSON.stringify(resp))
                window.sessionStorage.setItem('token',JSON.stringify(resp));
                let time=Date.now()+10*1000;
                console.log('刷新time:'+time)
                console.log('刷新now:'+Date.now())
                window.localStorage.setItem('time',time)
                console.log('token信息：'+sessionStorage.getItem('token'));
                window.sessionStorage.setItem('isRefreshing',false);

                if(flag){
                    console.log('非梧桐刷新进行跳转：'+path)
                    router.replace(path);

                }
            }
            else{
                console.log("打印else："+resp)
                Message.error({message:'认证失效，请重新登录！'})
                router.replace('/')
            }
        });

  //  window.sessionStorage.removeItem('token');
}
export const postKeyValueRequest=(url,params)=>{
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params,
        transformRequest:[function(data){
            let ret='';
            for(let i in data){
                ret+=encodeURIComponent(i)+'='+encodeURIComponent(data[i])+'&'
            }
            console.log(ret)
            return ret;

        }],
        headers:{
            'Content-Type':'application/x-www-form-urlencoded '
        }
    })
}
export const postRequest=(url,params)=>{
    return axios({
        method:'post',
        url:`${base}${url}`,
        data:params
    })
}
export const putRequest=(url,params)=>{
    return axios({
        method:'put',
        url:`${base}${url}`,
        data:params
    })
}
export const getRequest = (url,params)=>{
    return axios({
        method:'get',
        url:`${base}${url}`,
        // data:params
    })
}
export const deleteRequest=(url,params)=>{
    return axios({
        method:'delete',
        url:`${base}${url}`,
        data:params
    })
}

