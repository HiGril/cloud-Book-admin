<template>
 <div class="layout">
    <div class="header">
        <h2 class="title">欢迎来到云舒后台管理系统</h2>
    </div>
    <div class="side-bar">
        <el-menu
        background-color="#0a8ee6"
        text-color="#fff"
        :router="true"
        active-text-color="red"
        >
            <el-submenu index="1">
                <template slot="title" >
                    <i class="el-icon-location"></i>
                    <span>导航目录</span>
                </template>
                <el-menu-item-group> 
                    <el-menu-item index="/layout/index">首页</el-menu-item>
                    <el-menu-item index="/">登录页</el-menu-item>
                </el-menu-item-group>
               
            </el-submenu>

            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span >用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/users">用户列表</el-menu-item>
                    <el-menu-item index="/layout/adduser">添加用户</el-menu-item>
                    <el-menu-item index="/layout/edituser">修改个人信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
                <template  slot="title">
                    <i class="el-icon-document"></i>
                    <span>分类管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/category">分类列表</el-menu-item>
                    <el-menu-item index="/layout/addcategory">添加分类</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="4">
                <template  slot="title">
                    <i class="el-icon-setting"></i>
                    <span>图书管理</span>
                </template>
                <el-menu-item-group>  
                    <el-menu-item index="/layout/booklist">图书列表</el-menu-item>
                    <el-menu-item index="/layout/bookadd">添加图书</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

             <el-submenu index="5">
                <template  slot="title">
                    <i class="el-icon-more"></i>
                    <span >轮播图管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/layout/swiperlist">轮播图列表</el-menu-item>
                    <el-menu-item index="/layout/swiperadd">添加轮播图</el-menu-item>
                    <!-- <el-menu-item index="/layout/swiperedit">编辑轮播图</el-menu-item> -->
                </el-menu-item-group>
                
            </el-submenu>
        </el-menu>
    </div>
    <div class="main-content ml-200 clearfloat">
        <router-view></router-view>
    </div>
 </div>
</template>

<script >
export default {
 data() {
 return {
 }
 },
 components: {
 }
}
</script>
<style scoped lang="scss">
.layout{
   
    .title{
        text-align: center;
        font-weight: 400;
        line-height: 80px;
        height: 80px;
        border-bottom: 1px solid #f1f1f1;
        padding-left: 200px;
       background: #4abbfc;
       color: #fff;

       position: fixed;
       top: 0;
       right: 0;
       left: 0;
       z-index: 999;
    }
    .side-bar{
        width: 200px;
        position: fixed;
        left: 0;
        top: 0;
        bottom: 0;
        border-right: 1px solid #000;
        z-index: 998;
        background-color:#0a8ee6;
        padding-top: 56px;
        margin-top: 81px;
        /deep/{
            .el-menu{
                border-right:none;
            }
        }
        
    }
    .ml-200{
        margin-left: 200px;
    }
    .main-content{
        padding:15px;
        margin-top: 81px;
    }
}


</style>
