<template>
    <div class = "path">
      <button type="button" class="close" @click="delPath">
        &times;
      </button>
      <div class="path-content" @click="showDetail"></div>
    </div>
</template>

<script>
    export default {
      props: {
         point : Array
      },
      methods : {
        delPath () {
          console.log(this.point);
        },
        showDetail () {
          console.log(this.point);
        }
      }
    }
</script>

<style scoped>
  .path-content {
    width:20px;
    height: 20px;
    box-shadow: 0px 0px 1px #c7254e;
    border-radius: 50%;
    margin:6px;
    cursor: pointer;
  }
  .path {
    margin: 2px;
    float: left;
  }

</style>
