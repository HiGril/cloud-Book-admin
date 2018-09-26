<template>
 <div class="user-manage">
    <!-- 添加面包屑 -->
    <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item >用户管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <h2 class="title">用户列表</h2>
    <el-table :data="tabData">         
        <el-table-column
            prop="avatar"
            label="用户头像"
            width="150">
            <template slot-scope="scope">
                <img :src="scope.row.avatar" class="avatar">
            </template> 
        </el-table-column>
        <el-table-column
            prop="username"
            label="姓名"
            width="180">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.username }}</p>
                    <p>昵称: {{ scope.row.nickname }}</p>
                    <p>邮箱: {{ scope.row.email }}</p>
                    <p>个性签名: {{ scope.row.desc }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.username }}</el-tag>
                    </div>
                </el-popover>
            </template>
        </el-table-column>
         <el-table-column
            prop="nickname"
            label="昵称"
            width="180">
        </el-table-column>
         <el-table-column
            prop="email"
            label="邮箱"
            width="180">
        </el-table-column>
        <el-table-column
            prop="createdTime"
            label="日期"
            width="300">
        </el-table-column>
        <el-table-column
            prop="desc"
            label="个性签名"
            width="300">
        </el-table-column>
        
       
        <el-table-column label="操作"  class="table">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row._id)">删除</el-button>
            </template>
        </el-table-column>  
    </el-table>

    <div class="page">
        <el-pagination
            background
            layout="prev, pager, next"
            :page-size="5"
            @current-change="PageChange"
            :total="count">
        </el-pagination>
    </div>
    
 </div>
</template>
<script>
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
        this.$axios.get("/user", {pn:this.page,size:5}).then(res=>{
            console.log(res)
            if(res.code== 200){
                 this.count = res.count 
                this.tabData = res.data   
                console.log(this.count)
            }
        })
    },
    
    handleDelete(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post("/user/delete",{userIds:[id]}).then(res=>{
              if(res.code ==200){
                  this.$message.success(res.msg)
                  this.getData()
              }
          })
          this.$router.push("/layout/index")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    PageChange(page){
        // console.log(page)
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
        height: 80px;
        border-radius: 50%;
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
        // top: 0;
    }
    
}
</style>
