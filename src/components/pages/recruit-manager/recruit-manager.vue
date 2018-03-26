<template>
    <div>
      <!-- S make recruit data -->
      <div id = "routeData">
        <div class="modal-body">
          <el-form :model="initData" ref="modifyForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="线路编号">
              <el-select v-model="initData.routeId" filterable placeholder="选择线路" class="handle-input mr10" @change="handle">
                <el-option v-for="item in route" :key="item.routeId" :label="item.routeName" :value="item.routeId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="线路名称" >
              <el-input v-model="initData.routeName"></el-input>
            </el-form-item>
            <el-form-item label="招募编号" >
              <el-input v-model="initData.routeCode"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class = "body-foot">
          <el-button @click="makeRouteCode">制作招募数据</el-button>
          <el-input type="textarea" :autosize="{minRows: 10}" v-model="enterRouteCode"></el-input>
          <el-button @click="show">测试</el-button>
        </div>
      </div>
      <!-- E make recruit data -->
      <RecruitManagerModal v-bind:p_enterRouteCode="routeCode"></RecruitManagerModal>
    </div>
</template>

<script>
    import RecruitManagerModal from './recruit-manager-modal'
    export default {
        created () {
          this.getRouteData();
        },
        data () {
          return {
            route: [],
            initData: {
              routeId:'',
              routeName: '',
              routeEnterCode:''
            },
            routeCode:{},
            enterRouteCode:''
          }
        },
      methods : {
        getRouteData () {
          console.log("test");
          let self = this;
          self.$http.get('http://localhost:8899/getData/getAllRoutes').then(function(res){
            console.log(res);
            self.route=res.data;
          }).catch(function(err) {
            console.log(err);
          })
        },
        show(){
          if(!this.enterRouteCode){
            this.$message("请线选择线路数据！");
          }else{
            this.routeCode = JSON.parse(this.enterRouteCode);
            $("#editBox").modal();
          }
        },
        handle(val) {
          this.initData.routeId = val;
        },
        makeRouteCode () {
          let self = this;
          self.$http.get('http://localhost:8899/getData/getStopId', {
              params:{routeId: self.initData.routeId,
                      routeName: self.initData.routeName,
                      enterRouteId: self.initData.routeEnterCode}
          }).then(function (response) {
              self.enterRouteCode = JSON.stringify(response.data)
              if (window.localStorage) {
                localStorage.setItem('item', self.enterRouteCode)
              }
            }).catch(function (error) {
              console.log(error)
            })
        }
      },
      components: {
        RecruitManagerModal
      }
    }
</script>

<style scoped>
  .body-foot{
    margin: 5px 0px 0px 40px;
    padding: 5px;
  }
  .body-foot > button{
    margin-bottom:5px;
    margin-top: 5px;
  }

</style>
