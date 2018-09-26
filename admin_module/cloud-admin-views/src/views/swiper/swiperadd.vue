<template>
 <div class="page">
    <h2 v-if="this.$route.name == 'swiperadd'">添加轮播图</h2>
    <h2 v-else>修改轮播图</h2>
    <el-form :model="swiperData" class="from-750" ref="swiperData" :data="swiperData">
        <el-form-item label="轮播图标题" >
            <el-input v-model="swiperData.title" ></el-input>
        </el-form-item>
        <el-form-item label="轮播图书类名">
            <el-select v-model="swiperData.category" @change="categoryChange">
                <el-option v-for=" (item,index) in  categoryData"
                :key="index"
                :label="item.title"
                :value="item._id"
                >
                </el-option>
            </el-select>

            <div class="book-item clearfix"  v-if="getBookItem[0]">
                <div class="img-wrap">
                    <img :src="getBookItem[0].img" alt="">
                </div>
                <div class="book-desc">
                    <div class="title">
                        标题：{{getBookItem[0].title}}
                    </div>
                    <div class="author">
                        作者：{{getBookItem[0].author}}
                    </div>
                </div>
            </div>
        </el-form-item>

        <el-form-item label="轮播图封面">
            <uppic v-model="swiperData.img"></uppic>
        </el-form-item>
        <el-form-item label="轮播图排序">
            <el-input-number v-model="swiperData.index" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSaveAdd" v-if="this.$route.name == 'swiperadd'">提交</el-button>
            <el-button type="primary" @click="handleSaveEdit" v-else>保存修改</el-button>
        </el-form-item>
    </el-form>

    <!-- 弹出的Dialog框 -->
    <el-dialog title="书籍列表" :visible.sync="isShowDialog">
        <el-table :data="bookData">
            <el-table-column property="title" label="书名" width="150"></el-table-column>
            <el-table-column  label="书籍封面" width="200">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="" class="img-item">
                </template>

            </el-table-column>
            <el-table-column property="author" label="作者"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handelBook(scope.row._id)">添加</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
            <div class="fenPage"> 
                <el-pagination
                background
                :page-size="5"
                layout="prev,pager,next"
                @current-change="PageChange"
                :total="bookCount"
                >
                </el-pagination>
            </div>


    </el-dialog>

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
            book:"" , // 每一本图书对应的id
            category:""//列表对应的id    
        },
        
        bookpn: 1,
        bookCount:0,
        //列表的信息
        categoryData:[],
        //图书的信息
        bookData:[],
        //声明是否显示dialog
        isShowDialog:false
    }
 },
 created(){
    this.getcategory()
    if(this.$route.name == 'swiperadd'){
          this.swiperData = {
          title: '',
          img: '',
          book: '',
          index: '',
          category: ''
        }
        // console.log(this.swiperData) 
    }else{
        this.getSwiper()
    }
 },
 methods:{
      //获取分类信息
     getcategory(){
         this.$axios.get("/category",{pn:1,size:100}).then(res=>{
             this.categoryData = res.data
         })

     },

     //获取某分类下的所有图书  根据分类id获取这一分类id下面的所有图书
    async getBookData(){
        // console.log(this.swiperData)
        //  let params = {size: this.bookSize, pn: this.bookpn}
        const res = await this.$axios.get(`/category/${this.swiperData.category}/books`,{pn:this.bookpn,size:5})
        // console.log(res)
        if(res.code == 200){
            this.bookData = res.data.books  
            this.bookCount = res.count
        }
        // console.log(this.bookData)
     },
     //当分类列表的id改变时 根据分类列表id获取分类下的图书,并让Dialog显示
     categoryChange(){
        this.isShowDialog=true
         this.getBookData()
     },
     //通过图书的id添加图书
     handelBook(id){
         this.swiperData.book = id
         this.isShowDialog = false
        //  console.log(this.swiperData.book)   
     },

    //添加轮播图信息
    handleSaveAdd(swiperData){
        //判断添加轮播图信息是否完整
        let isCanSubmit = true  
        for(let item in this.swiperData)  
        {
            if(!this.swiperData[item]){ //如果对象的值为空
                isCanSubmit = false
            }
        }
        if(isCanSubmit){
            this.$axios.post("/swiper",this.swiperData).then(res=>{
                                if(res.code == 200){
                                    this.$message.success(res.msg)
                                    this.$router.push({path:"swiperlist"})
                                }
                            })
        }else{
             this.$message.error("提交失败，请确保信息填写完整");      
             }     
    },

     //分页处理
    PageChange(bookpn){
        // console.log(page)
        this.bookpn = bookpn
        this.getBookData()
        // console.log(page)
    },
    //在编辑页面时用
    //获取轮播图信息
    getSwiper(){
        
        const id = this.$route.query.id
        //  console.log(id)

        this.$axios.get(`/swiper/${id}`).then(res=>{
            // console.log(res)
            if(res.code == 200){
                this.swiperData = {   
                ... this.swiperData,
                ...res.data,
                book: res.data.book._id, //书籍id
                category:res.data.book.type //回填分类id
                }
                this.getBookData()
            }
        })   
    },
    //编辑轮播图
    handleSaveEdit(){
        this.$axios.put(`/swiper/${this.$route.query.id}`,this.swiperData).then(res=>{
            if(res.code==200){
                this.$message.success(res.msg)
                this.$router.push({path:"swiperlist"})
            }
        })

    },

   
    },

  //通过swiperData.book 和 bookData可以确定一本书
    computed:{ //getBookItem返回的是一个数组，数组里面只有一本书，
        getBookItem(){
            if(this.swiperData.book){//如果有值则用户已经选了一本书
            return this.bookData.filter(item=>item._id == this.swiperData.book)
            } else{
                return []
            }

        }

    },
}
</script>

<style scoped lang="scss">
.page{
    width: 750px;
    margin: 0 auto;

.book-item{
    width: 430px;
    padding: 20px;
    border:1px solid #999;
    margin-top: 20px;
    border-radius: 4px;
    .img-wrap{
        width: 100px;
        float: left;
        img{
            display: block;
            width: 100px;
            height: 100px;
        }
    }

    .book-desc{
        float: left;
        margin-left:20px ;

        .title{
            color: #333;
            font-weight: 700;
            font-size: 15px;
           
            
        }
        .author{
            color: #555;
        }
    } 
}
}
</style>

