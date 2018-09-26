// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "element-ui/lib/theme-chalk/index.css"
import ElementUI from 'element-ui';

import store  from "./store"
import {$axios}from "./utils/index"


//引入上传图片的组件
import uppic from "./components/pic"

Vue.use(ElementUI) //把里面的组件声明成全局组件

//将axios请求的方法挂载的Vue实例的原型上
Vue.prototype.$axios = $axios

Vue.config.productionTip = false

Vue.component('uppic', uppic)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App},
  template: '<App/>'
})
