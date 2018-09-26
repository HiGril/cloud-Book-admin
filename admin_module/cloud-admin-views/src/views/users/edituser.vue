<template>
    <div class="edit">
        <h2 class="title">修改个人信息</h2>
        <div class="edituser">
            <el-form  :model="formData"  label-width="100px" ref="formData"  :rules="rule">
                <el-form-item
                    prop="username"
                    label="用户名"                
                >
                    <el-input v-model="formData.username" placeholder="请输入用户名" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item
                    prop="nickname"
                    label="昵称"
                  
                >
                    <el-input v-model="formData.nickname" placeholder="请输入昵称"></el-input>
                </el-form-item>
                <el-form-item
                    prop="email"
                    label="邮箱"
                   
                >
                    <el-input v-model="formData.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item
                    prop="desc"
                    label="个性签名"
                >
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="formData.desc">
                    </el-input>
                </el-form-item>
                <el-form-item
                        prop="avatar"
                        label="上传头像"
                    >
                    <uppic @input="getImg" v-model="formData.avatar"></uppic>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('formData')">提交</el-button>
                    <el-button @click="resetForm('formData')">重置</el-button>  
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
        return {
            formData:{
                username: "",
                avatar:"",
                nickname:"",
                desc:"",
                email:"",
            },
            rule:{
              nickname:[{ required: true, message: '请输入昵称', trigger: 'blur' }]  ,
              desc:[{ required: true, message: '个性签名', trigger: 'blur' }],
              email:[{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}]

            }
        }
    },
    components: {uppic},
    methods:{
        initData(){
            this.formData = {...this.$store.state.fromData}
        },
        getImg(img){
            this.formData.avatar = img
        },
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    this.$axios.put("/user/userInfo",this.formData).then(res=>{
                        if(res.code == 200){
                            this.$store.commit("CHANGE_FORMDATA",res.data)
                            this.$message({
                                message: res.msg,
                                type: 'success'   
                            })
                            this.$router.push("/layout/index")
                        }
                    })        
                }
            })
           

        },
        resetForm(formData){
            this.$refs[formData].resetFields();  
        }
    },
    created(){
        this.initData()
    }

}
</script>

<style scoped lang="scss">
.edit{
    .title{
        margin: 25px auto;
        text-align: center;
        font-weight: 400;
        
    }
    .edituser{
            width: 750px;
            margin: 0  auto;
    }

}
</style>
