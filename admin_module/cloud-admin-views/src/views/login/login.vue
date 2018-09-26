<template>
 <div class="container">
     <h1 class="title">欢迎来到云舒后台管理系统</h1>
     <div class="login-box">
         <h2 >请&nbsp;&nbsp;登&nbsp;&nbsp;陆</h2>
         <el-form label-width="40px" class="form" ref="formData" :rules="rule"  :model="formData" >
            <el-form-item label="账号" prop="username" >
                <el-input v-model="formData.username" placeholder="请输入用户名" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="formData.password" type="password" placeholder="请输入密码" @keyup.enter.native="LoginPass('formData')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="LoginPass('formData')" class="login-btn" :login="isLogin">登&nbsp;&nbsp;陆</el-button>
            </el-form-item>
        </el-form>
     </div>

 </div>
</template>

<script >
export default {
    data() {
        const usernamePass =(rule, value, callback)=>{
            if(!value){
                callback(new Error("请输入正确的用户名"))
            }else{
                callback()
            }
        }
        const passwordPass = (rule, value, callback)=>{
            if(value && value.length>=5 ){
                callback()
            }else{
                callback(new Error("输入密码少于五位"))
            }
        }
        return {
            formData:{
                username:"",
                password:""
            },
            rule:{
                username:[{validator:usernamePass,trigger:"blur"}],
                password:[{validator:passwordPass,trigger:"blur"}]
            },
            isLogin:false
        }
        
    },
    methods:{
        handleLogin(){
            this.isLogin = true
            this.$axios.post("/login",this.formData).then(res=>{
                console.log(res)
                if(res.code == 200){
                    this.$store.commit("CHANGE_FORMDATA",res.data)
                    //登录成功显示登录成功的信息
                    this.$message({
                        // showClose: true,
                        message: '登录成功',
                        type: 'success'
                    });
                    setTimeout(() => {
                        this.$router.push("/layout/index")
                    }, 2000);
                
                }else{
                    //登陆失败显示登陆失败提示信息
                    this.$message({
                        showClose: true,
                        message: "登陆失败",
                        type: 'error'
                    });
                }
                this.isLogin = false
            }).catch(err=>{
            this.isLogin = false
                })
        },
        LoginPass(formName){
            // console.log("lll")
           this.$refs[formName].validate((valid)=>{
                // console.log("jjj")
                if (valid) {
                    this.handleLogin()  
                } else {
                    return false;
                }
            });
        }
       
    }
}
</script>

<style scoped lang="scss">
    .container{
        overflow: hidden;
        min-height:100vh;
        background: #007acc; 
        .title{
            margin-top: 50px;
            font-weight: 400;
            color: #ffffff;
            text-align: center;
        }
        .login-box{
            width: 440px;
            height: 290px;
            border: 1px solid #f1f1f1;
            border-radius: 6px;
            background: #fff;
            margin: 20px auto ;
            padding: 30px;
        }
        h2{
            text-align: center;
            // font-weight: 600;
            color: #131212; 
        }
        .form{
            margin-top: 40px;
        }
        .login-btn{
          width: 100%;
          box-sizing: border-box;
          font-size: 20px;
        }     
    }
</style>
