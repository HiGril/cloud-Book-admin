<template>
 <div class="page">
    <h2>修改轮播图</h2>
    <el-form :model="swiperData" class="from-500">
        <el-form-item label="轮播图标题">
            <el-input v-model="swiperData.title"></el-input>
        </el-form-item>
        <el-form-item label="轮播图书类名">
            <el-select v-model="categoryData.title" @change="categoryChange">
                <el-option v-for=" (item,index) in  categoryData"
                :key="index"
                :label="item.title"
                :value="item._id"
                >
                </el-option>
            </el-select>
            <div class="book-item clearfix">
                <!-- <div class="img-wrap">
                    <img :src="" alt="">

                </div> -->

            </div>
        </el-form-item>
        <el-form-item label="轮播图封面">
            <uppic v-model="swiperData.img"></uppic>
        </el-form-item>
        <el-form-item label="轮播图排序">
            <el-input-number v-model="swiperData.index" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSaveEdit">
                保存更改
            </el-button>
        </el-form-item>

              




    </el-form>

 </div>
</template>

<script>
export default {
 data() {
 return {
     //轮播图的信息
     swiperData:{
         title:"", //轮播图标题
         img:"",
         index:"",
         book:""  //book对应的id
         
     },
     //列表的信息
     categoryData:[],
     //图书的信息
     bookData:[]

 }
 },
 components: {

 },
 created(){
    this.getSwiper()
    this.getcategory()
 },
 methods:{
     //获取轮播图信息
     getSwiper(){
         const id = this.$route.query.id
        //  console.log(id)
        this.$axios.get(`/swiper/${id}`).then(res=>{
            console.log(res)
            if(res.code == 200){
                this.swiperData = {   
                ...res.data,
                book: res.data.book._id, //书籍id
                
                }
            }
        })   
     },
     //获取分类信息
     getcategory(){
         this.$axios.get("/category",{pn:1,size:100}).then(res=>{
             this.categoryData = res.data
         })

     },
     categoryChange(){

     },
     handleSaveEdit(){

     }
 }
}
</script>

<style scoped lang="scss">
</style>

