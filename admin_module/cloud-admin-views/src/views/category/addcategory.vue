<template>
 <div class="page">
     <h1 class="title">添加分类</h1>
     <el-form :model="formData" :data="formData" ref="formData" label-width="100px" :rules="rule">
         <el-form-item 
         prop="title"
         label="类名"
         >
            <el-input v-model=" formData.title" placeholder="请输入类名"></el-input>
         </el-form-item>
         <el-form-item
            prop="icon"
            label="图片"
         >
            <uppic  @input="getImg"   v-model=" formData.icon" class="icon"></uppic>
         </el-form-item>

         <el-form-item>
             <el-button type="primary" @click="submitForm('formData')">提交</el-button>
         </el-form-item>

     </el-form>

 </div>
</template>

<script >
import uppic from "@/components/pic"
export default {
 data() {
 return {
     formData:{
         title:"",
         icon:""
     },
     rule:{
     }
 }
 },
 components: {uppic},
 methods:{
     submitForm(form){
         console.log(form)
         this.$refs[form].validate((valid)=>{
             console.log(this.formData)
             if(valid){
                 console.log("kkk")
                 this.$axios.post("/category",this.formData).then(res=>{
                     console.log(res)
                     if(res.code == 200){
                         this.$message.success("添加分类成功")
                         this.$router.push("/layout/category")
                     }
                 })
             }
         })

     },
     getImg(img){
         this.formData.img = img
     },
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
