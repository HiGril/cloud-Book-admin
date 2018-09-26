<template>
 <div class="page">
    <h2 class="title">编辑分类</h2>
    
    <el-form :model="fromData" ref="fromData" label-width="100px" :rules="rule">
        <el-form-item
            prop="title"
            label="类名"
        >
            <el-input v-model="fromData.title" placeholder="请输入类名" ></el-input>
        </el-form-item>
        <el-form-item
            prop="icon"
            label="图片"
        >
            <uppic v-model="fromData.icon" class="icon"></uppic>
        </el-form-item>  
        <el-form-item  prop="index" label="排行">
             <el-input-number
                v-model="fromData.index"
                @change="handleChange" 
                :min="1">
            </el-input-number>
        </el-form-item> 
        <el-form-item>
            <el-button type="primary" @click="submitForm('fromData')">提交</el-button>
            <!-- <el-button @click="resetForm('fromData')">重置</el-button>   -->
        </el-form-item>
    </el-form>
    
 </div>
</template>

<script>
import uppic from "@/components/pic"
export default {
 data() {
    return {
        fromData:{author:"",icon:"",index:""},
        rule:{
            title:[{ required: true, message: '请输入类名', trigger: 'blur' }] 
        }
    }   
},
components: {uppic},
 created(){
    this.getBook()
    },
 methods:{
    getBook(){
        const id = this.$route.query.id
        //  console.log(id)
        this.$axios.get(`/category/${id}`).then(res=>{
            console.log(res)
            this.fromData = res.data
            // console.log(this.fromData)
        })

    },
    // getImg(img){
    //     this.fromData.icon = img
    // },
    handleChange(){},
    submitForm(fromData){
        // console.log(fromData)
         let id = this.$route.query.id
        this.$refs[fromData].validate((valid)=>{
            if(valid){
                this.$axios.put(`/category/${id}`,this.fromData).then(res=>{
                    // console.log(res)
                    if(res.code ==200){
                        this.$message.success("修改信息成功")
                        this.$router.push("/layout/category")
                    }
                })
              
            }
        })
    },
    // resetForm(fromData){
        
    //     this.getBook()
    //     // console.log(this.fromData)
    //     this.$refs[fromData].resetFields()
    // }

      
 }
}
</script>

<style scoped lang="scss">
.page{
    width: 750px;
    margin: 0 auto;
    .icon{
        margin-left: -60px;
    }
    .title{
        margin: 25px auto;
        text-align: center;
        font-weight: 400;
        
    }
}
</style>

