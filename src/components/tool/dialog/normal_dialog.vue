<template>
  <el-dialog
    title="提示"
    :visible.sync="visible"
    width="30%"
    :show="show"
    >
    <span>{{message}}</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="doclose">取 消</el-button>
    <el-button type="primary" @click="doclose">确 定</el-button>
  </span>
  </el-dialog>

</template>

<script>
    export default {
        data () {
          return {
            visible: this.show,
            content: this.message
          };
        },
        props: {
          show: {
            type: Boolean,
            default: false
          },
          message: {
            type: String,
            default: 'this dialog do not has any message!'
          }
        },
        watch: {
          show () {
            this.visible = this.show;

          },
          message () {
            this.content = this.message;
          }
        },
        methods: {
            doclose() {
              this.$emit('update:show', false);//子组建通过emit方法触发父组件的方法
              this.visible =false;
            }
        }
    };
</script>

<style scoped>

</style>
