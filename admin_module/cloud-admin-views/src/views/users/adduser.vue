<template>
 <div class="adduser">
       <!-- 添加面包屑 -->
    <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >用户管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <h2 class="title">添加用户</h2>
    <div class="addFrom">
        <el-form :model="addUserFrom" ref="addUserFrom" label-width="100px" :rules="rule">
            <el-form-item
                prop="username"
                label="用户名"
               
            >
                <el-input v-model="addUserFrom.username" placeholder="请输入用户名" ></el-input>
            </el-form-item>
            <el-form-item
                prop="nickname"
                label="昵称"
                
            >
                <el-input v-model="addUserFrom.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item
                prop="email"
                label="邮箱"
               
            >
                <el-input v-model="addUserFrom.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item
                prop="desc"
                label="个性签名"
            >
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="addUserFrom.desc">
                </el-input>
            </el-form-item>
            <el-form-item
                    prop="avatar"
                    label="上传头像"
                >
                <uppic @input="getImg" v-model="addUserFrom.avatar"></uppic>
            </el-form-item>
            <el-form-item label="密码" prop="password" >
                <el-input type="password" v-model="addUserFrom.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPassword" >
                <el-input type="password" v-model="addUserFrom.checkPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('addUserFrom')">提交</el-button>
                <el-button @click="resetForm('addUserFrom')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
 </div>
</template>
<script>
// import uppic from "@/components/upPic"
import uppic from "@/components/pic"
export default {
 data() {
    var validatePass = (rule, value, callback) => {
        if (value == '') {
            callback(new Error('请输入密码'));
        }else  if (value.length <5){
            callback(new Error('请输入密码要求大于五位'));
        }else {
            callback();
        }
    };
    var validatePass2 = (rule, value, callback) => {
        if(value == ""){
            callback(new Error('请输入密码!'));
        } else if (value != this.addUserFrom.password) {
            console.log(value)
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    }
    return {
        addUserFrom:{
            username: "",
            avatar:"",
            nickname:"",
            desc:"",
            email:"",
            password:"", 
            checkPassword:"" 
        },
        rule:{
            username:[ { required: true, message: '请输入用户名', trigger: 'blur' } ],
            nickname:[{ required: true, message: '请输入昵称', trigger: 'blur' }],

            email:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                   { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],

            desc:[{required: true, message: '个性签名', trigger: 'blur' }],
            password:[{ required: true, validator: validatePass, trigger: 'blur'}],
            checkPassword:[{required: true, validator: validatePass2, trigger: 'blur'}]
        }
             
    }
 },
 components:{uppic},
 methods:{
     getImg(img){
         console.log(img)
         this.addUserFrom.avatar = img
     },
    submitForm(formName){
        this.$refs[formName].validate((valid)=>{
            if(valid){
                this.$axios.post("/user",this.addUserFrom).then(res=>{
                // console.log(res);
                    if(res.code == 200){
                        this.$message({
                        message: res.msg,
                        type: 'success'   
                        })
                    }
                    this.$router.push("/layout/index")
                }) 
            }
        })            
    },
    resetForm(formName){
        this.$refs[formName].resetFields();   
    }
 }
}
</script>

<style scoped  lang="scss">
.adduser{
    .title{
        margin: 25px auto;
        text-align: center;
        font-weight: 400;
        
    }
    .addFrom{
            width: 750px;
            margin: 0  auto;
        }
}
</style>
