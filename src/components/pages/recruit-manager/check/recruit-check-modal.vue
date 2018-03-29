<template>
  <!-- 模态框（Modal） -->
  <div class="modal fade" id="editBox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
            &times;
          </button>
          <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
          <div class = "modal-body">
            <el-form :model="routeData" ref="modifyForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="线路名称">
                <el-input v-model="routeData.routeName"></el-input>
              </el-form-item>
              <el-form-item label="线路编号" >
                <el-input v-model="routeData.routeId"></el-input>
              </el-form-item>
              <el-form-item label="票价" >
                <el-input v-model="routeData.price"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          title: '修改线路',
          routeData : {
            routeName:'',
            routeId:'',
            stations: [],
            path:[],
            price:''
          }
        }
      },
      props: {
        rowData: Object
      },
      watch: {
        rowData() {
          console.log(this.rowData);
          this.routeData = this.rowData;
        }
      }
    }
</script>

<style scoped>

</style>
