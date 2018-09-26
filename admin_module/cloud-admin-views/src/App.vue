<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.from-750 {
  width: 750px;

}
.img-item{
  width: 80px;
  height: 100px;
}
.clearfix::after{
  content: "";
  clear: both;
  height: 0;
  display: block;
  

  
}
</style>
