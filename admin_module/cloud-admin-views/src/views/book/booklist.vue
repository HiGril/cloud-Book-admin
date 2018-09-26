<template>
 <div class="booklist">
    <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >图书管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <h2 class="title">图书列表</h2>
    <el-table :data="bookData">
        <el-table-column
            prop="img"
            label="封面"
            width="200"
        >
            <template slot-scope="scope">
                <img :src="scope.row.img"  class="img">
            </template>
        </el-table-column>
        <el-table-column
            prop="author"
            label="作者"
            width="200"
        > 
        </el-table-column>
        <el-table-column
            prop="title"
            label="标题"
            width="350"
        > 
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="创建日期"
            width="400"
        >
        <template slot-scope="scope">
            <i class="el-icon-message"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
        </el-table-column>
        <el-table-column label="操作"  class="table">
            <template slot-scope="scope">
                <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column> 

    </el-table>

      <div class="page">
            <el-pagination
                background
                layout="prev, pager, next"
                 @current-change="PageChange"
                :total="1000">
            </el-pagination>
        </div>

 </div>
</template>

<script>
export default {
 data() {
    return {
    bookData:[],
    page:1,
    }
 },
 components: {

 },
  created(){
      this.getBook()
 },
 methods:{
     //获取图书信息
     getBook(){
         this.$axios.get("/book", {pn:this.page,size:5}).then(res=>{
            //  console.log(res)
            if(res.code == 200){
                this.bookData = res.data
                // console.log(this.bookData)
            }  
         })
     },
     PageChange(page){
         this.page = page
         this.getBook()

     },
     //编辑图书信息
     handleEdit(index,row){
         this.$router.push(`/layout/bookedit?id=${row._id}`)

     },
     //删除图书信息
     handleDelete(index,row){
         this.$confirm("此操作将永久删除该文件，是否继续？","提示",{
             confirmButtonText:'确定',
             cancelButtonText:'取消',
             type:"warning"
         }).then(()=>{
             this.$axios.delete(`/book/${row._id}`).then(res=>{
                //  console.log(res)
                if(res.code==200){
                    this.$message.success(res.msg)
                    this.getBook()
                }
             })

         }).catch(err=>{
             this.$message.error(err)
         })

     }

 }

}
</script>

<style scoped lang="scss">
.booklist{
    img{
        width: 90px;
        height: 80px;
    }

}
</style>
