import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store';
import 'font-awesome/css/font-awesome.min.css';
import VueCookies from 'vue-cookies';

import {postRequest} from "./utils/api";
import {postKeyValueRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {initMenu} from "./utils/menus";
import {rsaEncrypt} from "./utils/rsa";


Vue.prototype.postRequest=postRequest;
Vue.prototype.postKeyValueRequest=postKeyValueRequest;
Vue.prototype.putRequest=putRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.rsaEncrypt=rsaEncrypt;
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueCookies)
//相当于一个过滤器，可以监听每次页面跳转,有页面跳转时判断是不是需要初始化菜单（用户如果刷新页面，就需要初始化菜单，因为刷新后内存中的store无了）
router.beforeEach((to,from,next) =>{
  if(to.path=='/'){
    next();
  }else{
    if(window.sessionStorage.getItem('user')){
      initMenu(router,store);
      next();
    }else{
      next('/?redirect='+to.path);
    }

  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
