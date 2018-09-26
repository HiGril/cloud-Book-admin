<template >
    <div class="user-manage">
        <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >分类管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <h2 class="title">分类列表</h2>
        <el-table :data="tabData">
            <el-table-column
                prop="icon"
                label="列表封面图像"
                width="180"
            >
            <template slot-scope="scope">
                <img :src="scope.row.icon" class="avatar">
            </template> 
            </el-table-column>
            <el-table-column
                prop="title"
                label="类名"
                width="200"
            >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>类名: {{ scope.row.title }}</p>
                        <p>数量: {{ scope.row.books.length }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.title }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
           
            <el-table-column
                prop="index"
                label="index"
                width="200"
            >
            </el-table-column>
             <el-table-column
                prop="_id"
                label="typeId"
                width="300"
            >
            </el-table-column>
            <el-table-column
                prop="books.length"
                label="数量"
                width="200"
            >
            </el-table-column>
            <el-table-column label="操作"  class="table">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index,scope.row)">编辑</el-button>
                    <el-button
                     size="mini"
                     @click="handleDetail(scope.$index,scope.row)">详情</el-button> 
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>  
        </el-table>

        <div class="page">
            <el-pagination
                background
                :page-size="5"
                layout="prev, pager, next"
                 @current-change="PageChange"
                :total="count">
            </el-pagination>
        </div>

    </div>
</template>
<script >
export default {
 data() {
    return {
        tabData: [],
        count:1,
        page:1
    }
 },
 methods:{
        getData(){
        this.$axios.get("/category", {pn:this.page,size:5}).then(res=>{
            // console.log(res)
            if(res.code== 200){
                 this.count = res.count 
                this.tabData = res.data   
            }
        })
    },
     handleEdit(index,row){
         this.$router.push(`/layout/editcategory?id=${row._id}`)
     },
     handleDetail(index,row){
         this.$router.push(`/layout/detailcategory?id=${row._id}`)
     },
    handleDelete(index,row){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(`/category/${row._id}`).then(res=>{
              if(res.code ==200){
                    this.getData()
                    this.$message({
                        type: 'success',
                        message: "删除成功"
                    });
                    this.$router.push("/layout/category") 
                }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
     PageChange(page){
        //  console.log(page)
         this.page = page
         this.getData()
     }

 },
 created(){
    this.getData()
}

}
</script>

<style scoped lang="scss">


.user-manage{
    position: relative;
    .avatar{
        width: 80px;
        height: 90px;
        // border-radius: 50%;
    }
    .table{
        margin: 0 auto;
    }
    .title{
        margin: 25px auto;
        text-align: center;
        font-weight: 400;
    }
    .page{
        position: absolute;;
        bottom: -50px;
        right: 200px;
  
    }
    
}
</style>
