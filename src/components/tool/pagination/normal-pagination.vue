<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalCount">
  </el-pagination>
</template>

<script>
    export default {
      data() {
        return {
          currentPage: 1,
          totalCount: this.count,
          pageSize: 10
        }
      },
      methods: {
        //这里2个参数需要传送给父组件
        handleSizeChange(val) {
          this.pageSize = val;
          this.$emit("handleSizeChangeVal", val);
        },
        handleCurrentChange(val) {
          this.currentPage = val;
          this.$emit("handleCurrentChangeVal", val);
        }
      },
      props: {
        //这个参数需要监听父组件的变化来改变
        count: Number
      },
      watch: {
        count () {
          this.totalCount = this.count;
        }
      }
    };
</script>

<style scoped>

</style>
