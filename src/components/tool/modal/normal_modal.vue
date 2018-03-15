<template>
  <!-- 模态框（Modal） -->
  <div class="modal fade" id="editBox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
            &times;
          </button>
          <h4 class="modal-title" id="myModalLabel">信息编辑</h4>
        </div>
        <div class="modal-body">
          <div >
            <input type="text" class="form-control" v-model="initialData">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="save()">
            保存
          </button>
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
          return {
            initialData:{}
          }
        },
        props: {
          initData: String
        },
        methods: {
          save () {
              console.log("修改后的数据:" + initData);
          }
        },
        watch: {
          initData() {
            this.initialData = this.initData;
          }
        }
    }
</script>

<style scoped>

</style>
