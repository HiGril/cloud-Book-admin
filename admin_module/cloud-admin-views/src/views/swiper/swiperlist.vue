<template>
    <div >
        <h1 class="title">轮播图列表</h1>
        <div class="swiper">
            <el-table :data="swiperData" style="width: 100%">
                <el-table-column  label="轮播图封面" width="200">
                    <template slot-scope="scope">
                        <img :src="scope.row.img" alt="" class="swiper-item-img" >
                    </template>
                </el-table-column>

                    <el-table-column  label="轮播图标题标题" prop="title" width="300"></el-table-column>

                <el-table-column label="图书封面" prop="book.img" width="200">
                    <template  slot-scope="scope">
                      <img :src="scope.row.book.img" alt="" class="swiper-item-img">  
                    </template>
                </el-table-column> 

                <el-table-column  label="书籍标题" prop="book.title" width="400"></el-table-column>

                <el-table-column  label="操作" class="btn">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="editswiper(scope.row._id)">编辑</el-button>
                        <el-button size="small" type="danger" @click="deleteswiper(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="page"> 
                <el-pagination
                background
                :page-size="5"
                layout="prev,pager,next"
                @current-change="PageChange"
                :total="count"
                >
                </el-pagination>
            </div>

        </div>
    </div>
</template>

<script >
export default {
    data() {
        return {
            swiperData:[],
            book:{},
            page:1,
            count:0

        }
    },
   created(){
       this.getSwiper()

   },
    methods:{
        //获取轮播图列表
        getSwiper(){
            this.$axios.get("/swiper",{pn:this.page,size:5}).then(res=>{
                // console.log(res)
                if(res.code == 200){
                    this.count = res.count
                    this.swiperData = res.data
                    
                }
            })
        },
         //分页
        PageChange(page){
            // console.log(page)
            this.page = page
            this.getSwiper()

        },
        //编辑轮播图
        editswiper(id){
            this.$router.push({name:"swiperedit",query:{id}})  
        },
        //删除轮播图
        deleteswiper(id){
            this.$confirm("此操作将永远删除该文件,是否继续","提示",{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:"warning"
            }).then(()=>{
                this.$axios.post('/swiper/delete',{ids:[id]}).then(res=>{
                    // console.log(res)
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        this.getSwiper()
                    }
                })

            }).catch(()=>{
                this.$message({
                    type:"info",
                    message:"已经取消删除"
                })
            })


        }


    }
}
</script>

<style scoped lang="scss">
.swiper{
.swiper-item-img{
    height: 90px;
    width: 80px;
}
/deep/{.btn{
    margin-left: 100px;

}
}

}
</style>
