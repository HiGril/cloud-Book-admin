import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const components = {
  login:()=>import("@/views/login/login"),
  layout:()=>import("@/views/layout/layout"),
  index:()=>import("@/views/index/index"),
  users: () => import("@/views/users/index"),
  adduser: () => import("@/views/users/adduser"),
  edituser: () => import("@/views/users/edituser"),

  
  category: () => import("@/views/category/categoryList"),
  detailcategory: () => import("@/views/category/detailcategory"),
  editcategory: () => import("@/views/category/editcategory"),
  bookedit: () => import("@/views/category/bookedit"),
  addcategory:() => import("@/views/category/addcategory"),
  
  booklist:()=>import("@/views/book/booklist"),
  bookadd:()=>import ("@/views/book/bookadd"),

  swiperlist: () => import("@/views/swiper/swiperlist"),

  swiperadd: () => import("@/views/swiper/swiperadd"),
  // swiperedit: () => import("@/views/swiper/swiperedit")

}
const router =  new Router({
  routes: [
    {
      path: '/',
      redirect:"/login",
      meta: {
        title: "登录页"
      },
    },
    {
      path:"/login",
      component: components.login,
      meta: {
        title: "登录页"
      },
    },
    {
      path:"/layout",
      component:components.layout,
      redirect:"/layout/index" ,
      meta:{
        title:"首页"
      },
      children:[
        {
          path:"index",
          component:components.index,
           meta: {
            title: "首页"
          },
        },
        {
          path:"users",
          component:components.users,
          meta: {
            title: "用户列表"
           },
        },
        {
          path:'adduser',
          component:components.adduser,
          meta:{
            title:"添加用户"
          }
        },
        {
          path:"edituser",
          component: components.edituser,
          meta:{
            title:"修改个人信息"
          }
        },
       
        {
          path:"category",
          component: components.category,
          meta:{
            title:"分类列表"
          }
        },
        {
          path:"detailcategory",
          component: components.detailcategory,
          meta:{
            title:"分类详情"
          }
        },
        {
          path:"editcategory",
          component: components.editcategory,
          meta:{
            title:"编辑分类"
          }
        },
        {
          path:"bookedit",
          component: components.bookedit,
          meta:{
            title:"书籍编辑"
          }
        },
        {
          path:"addcategory",
          name:"addcategory",
          component: components.addcategory,
          meta:{
            title:"添加分类"
          }
        },
        {
          path:"booklist",
          name:"booklist",
          component:components.booklist,
          meta:{
            title:"图书列表"
          } 
        },
        {
          path:"bookadd",
          name:"bookadd",
          component:components.bookadd,
          meta:{
            title:"添加图书"
          }
        },
        {
          path:"swiperlist",
          name:"swiperlist",
          component: components.swiperlist,
          meta:{
            title:"轮播图列表"
          }
        },
        {
          path:"swiperadd",
          name:"swiperadd",
          component: components.swiperadd,
          meta:{
            title:"添加轮播图"
          }  
        },
        {
          path:"swiperedit",
          name:"swiperedit",
          component: components.swiperadd,
          meta:{
            title:"修改轮播图"
          }
        }
        
      ]
    }
   
  ],
})
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next();
})
export default router



