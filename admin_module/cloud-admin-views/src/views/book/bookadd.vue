<template>
 <div class="page">
     <h2 class="title">添加图书</h2>
     <div>
         <el-form :model="bookadd" ref="bookadd">
             <el-form-item label="书籍封面">
                 <el-switch
                    v-model="isShow"
                    active-text="封面地址"
                    inactive-text="手动上传">
                    </el-switch>
                    <el-input v-model="bookadd.img" v-if="isShow" ></el-input>
                    <uppic v-model="bookadd.img" v-else></uppic> 
             </el-form-item>
             <el-form-item label="书籍链接地址">
                 <el-input v-model="bookadd.url"></el-input>
             </el-form-item>
             <el-form-item label="作者">
                 <el-input v-model="bookadd.author"></el-input>
             </el-form-item>
             <el-form-item label="分类">
                <el-select v-model="bookadd.typeId" placeholder="请选择">
                    <el-option
                    v-for="(item,index ) in category"
                    :key="index"
                    :label="item.title"
                    :value="item._id">
                    </el-option>
                </el-select>
             </el-form-item>
             <el-form-item>
                 <el-button type="primary" @click="handelAdd('bookadd') ">提交</el-button>
             </el-form-item>

         </el-form>
     </div>

 </div>
</template>

<script >

export default {
 data() {
    return {
        bookadd:{
            url:"",
            author:"",
            img:"",
            typeId:""
        },
        isShow:true,
        category:[]

    }
 },
 created(){
     this.getcategory()

 },
 methods:{
     //获取分类
    async getcategory(){
        const res = await this.$axios.get('/category',{pn:1,size:100})
        this.category = res.data

     },
     handelAdd(book){
         this.$refs[book].validate((valid)=>{
             if(valid){
                 this.$axios.post("/book",this.bookadd).then(res=>{
                    //  console.log("bookadd")
                    //  console.log(res)
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        this.$router.push("/layout/booklist")
                    }
                 })
             }
         })


     }

 }

}
</script>

<style scoped lang="scss">
</style>
