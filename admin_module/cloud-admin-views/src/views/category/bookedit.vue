<template>
 <div class="page">
        <h1 class="title">修改书本信息</h1>
        <el-form :model="bookData" ref="bookData" :rules="rule" label-width="100px">
            <el-form-item
                prop="img"
                label="封面"
            >
            <uppic @input="getImg" v-model="bookData.img" ></uppic>
            </el-form-item>
            <el-form-item
            label="排序" >
                <el-input-number
                    v-model="bookData.index"
                    label="index" 
                    :min="1">
                </el-input-number>
            </el-form-item>
            <el-form-item
                label="分类"
                prop="title"
            >
                <el-select v-model="list.title"  >
                    <el-option
                        v-for="(item, index) in list"
                        :key="index"
                        :label="item.title"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item 
                prop = "author"
                label="作者"
            >
                <el-input v-model="bookData.author"></el-input>
            </el-form-item>

            <el-form-item 
                prop = "title"
                label="标题"
            >
                <el-input v-model="bookData.title"></el-input>
            </el-form-item>

             <el-form-item 
                prop = "desc"
                label="简介"
            >
                <el-input v-model="bookData.desc" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
                    <el-button type="primary" @click="submitForm('bookData')">提交</el-button>
                    <!-- <el-button @click="resetForm('bookData')">重置</el-button>   -->
            </el-form-item>
        </el-form>
 </div>
</template>

<script >
import uppic from "@/components/pic"
export default {
 data() {
 return {
     bookData:{
         author:"",
         index:"",
         img:"",
         desc:"",
         type:"",
         book_id:"",
         title:""
     },   
     rule:{
         author:[{ required: true, message: '请输入作者', trigger: 'blur' }] 

     },
     list:[]

 }
 },
 components: {uppic},
 created(){
     this.getBook()
     this.getCategory()
 },
 methods:{
     //获取图书信息
     getBook(){
         const id = this.$route.query.id
        //  console.log(id)
         this.$axios.get(`/book/${id}`).then(res=>{
             console.log(res)
             if(res.code == 200){
                 this.bookData = res.data
                //  console.log(this.bookData.book_id)  
             }
         })

     },

     getCategory(){
         this.$axios.get("/category",{pn:1,size:100}).then(res=>{
            //  console.log(res)
             this.list = res.data
         })
     },
     getImg(img){
         this.bookData.img = img
     },
     submitForm(bookData){
        //  console.log(this.bookData.book_id)
         let params = {
          ...this.bookData,
          book_id:this.$route.query.id
        }
        // console.log(bookData.book_id)
         this.$refs[bookData].validate((valid)=>{     
             if(valid){
                 this.$axios.put("/book",params).then(res=>{
                    //  console.log(res)
                     if(res.code == 200){
                         this.$message.success(res.msg)
                         this.$router.push("/layout/category")
                     }
                     
                 })
             }
         })
         


     },
    //  resetForm(bookData){
    //     //  console.log(bookData)

    //      this.$refs[bookData].resetFields()
    //  }

    

 }
}
</script>

<style scoped lang="scss">
.page{
    width: 750px;
    margin: 0 auto;
     .title{
        margin: 25px auto;
        text-align: center;
        font-weight: 400;
        
    }

}
</style>
