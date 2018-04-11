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
              <el-form-item label="站点" >
                <!--<el-input type="textarea" v-bind:value="routeData.price"></el-input>-->
                <stations :routeStation="sta" v-for="sta in routeData.stations" :key="sta.stationName"></stations>
              </el-form-item>
              <el-form-item label="路径" >
                <path-point :point="p" v-for="p in routeData.path" :key="p.lat"></path-point>
              </el-form-item>
              <el-form-item label="起点名称" >
                <el-input v-model="routeData.originName"></el-input>
              </el-form-item>
              <el-form-item label="终点名称" >
                <el-input v-model="routeData.terminalName"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="updateToMongo()">
              保存
            </button>
            <button type="button" class="btn btn-default" data-dismiss="modal">关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import stations from './check-tool/stations'
    import pathPoint from './check-tool/path'
    export default {
      data () {
        return {
          title: '修改线路',
          routeData : {
            routeName:'',
            routeId:'',
            stations: [],
            path:[],
            price:'111'
          }
        }
      },
      props: {
        rowData: Object
      },
      methods: {
        updateToMongo () {
          console.log(this.routeData);
        }
      },
      watch: {
        rowData() {
          this.routeData = this.rowData;
        }
      },
      components : {
        stations,pathPoint
      }
    }
</script>

<style scoped>

</style>
