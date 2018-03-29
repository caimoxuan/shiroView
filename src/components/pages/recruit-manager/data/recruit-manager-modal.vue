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
          <RecruitMap ref="recruitMap" v-bind:routeData="enterRouteCode"></RecruitMap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RecruitMap from './recruit-manager-map'
  export default {
    data() {
      return {
        title: '线路预览',
        enterRouteCode:{}
      }
    },
    props: {
      p_enterRouteCode : Object
    },
    watch: {
      p_enterRouteCode(){
        this.enterRouteCode = this.p_enterRouteCode;
        this.$refs.recruitMap.init();
      }
    },
    components: {
      RecruitMap
    }
  }
</script>

<style scoped>
#editBox{
  width:100%;
  height:100%;
}
</style>

