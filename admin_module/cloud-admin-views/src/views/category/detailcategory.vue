<template>
 <div class="user-manage">
      <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >分类管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
     <h3 class="title">{{title}}</h3>
     <el-table :data=" bookData">
            <el-table-column
                prop="icon"
                label="封面"
                width="180"
            >
            <template slot-scope="scope">
                <img :src="scope.row.img" class="avatar">
            </template> 
            </el-table-column>
            <el-table-column
                label="作者"
                width="200"
            >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>类名: {{ scope.row.author }}</p>
                        <p>简介: {{ scope.row.desc }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.author }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
           
            <el-table-column
                prop="index"
                label="创建日期"
                width="200"
            >
            </el-table-column>
             <el-table-column
                prop="_id"
                label="typeId"
                width="300"
            >
                <template slot-scope="scope">
                    <i class="el-icon-message"></i>
                    <span style="margin-left: 10px">{{ scope.row.index }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作"  class="table">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <!-- <el-button
                    size="mini"
                    @click="bookdetail(scope.$index, scope.row)">详情</el-button> -->
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>  
        </el-table>

 </div>
</template>

<script >
export default {
    data() {
        return {
            bookData :[],
            title:""
        }
    },
    created () {
        this.getDetail()
    },
    methods:{
        //获取书籍信息
        getDetail () {
            // console.log("kkkk")
            // console.log(this.$route.query.id)
            const id=this.$route.query.id
            this.$axios.get(`/category/${id}/books`,{pn:1,size:100}).then(res=>{
              console.log(res)
                if(res.code == 200){
                //   console.log(res.data)
                  this.bookData = res.data.books
                  this.title = res.data.title
                //   console.log(this.bookData)
              }
          })
        },
        //编辑书籍
        handleEdit(index,row){
            this.$router.push(`/layout/bookedit?id=${row._id}`)
        },
        //删除书籍
        handleDelete(index, row){
            this.$confirm("此操作将永久删除该文件，是否继续？","提示",{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                let id = this.$route.query.id
                // console.log("jjjj")
                 this.$axios.delete(`/category/${id}/book/${row._id}`).then(res=>{
                   console.log(res)
                    if(res.code ==200){
                        this.$message.success(res.msg)
                        this.getDetail()
                    }
                })
                // this.$router.push("/layout/index")
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            

        },
        //获取书籍详情
        bookdetail(){

        }
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
        // text-align: center;
        font-weight: 400;
    }
    .page{
        position: absolute;;
        bottom: -50px;
        right: 200px;
        
    }
    
}
</style>
