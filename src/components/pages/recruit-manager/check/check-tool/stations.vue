<template>
  <div class = "station-bar">
    <button type="button" class="close" @click="delStation">
      &times;
    </button>
    <div class = "route-station">
      <div class="station-content">
        <div>{{routeStation.stationName}}</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data () {
          return {

          }
        },
      methods:{
          delStation() {
            console.log("delStation" + JSON.stringify(this.routeStation));
          }
      },
      props:{
        routeStation: Object
      }
    }
</script>

<style scoped>
  .station-bar {
    display: inline-block;
    float:left;
    margin-right:5px;
  }
  .route-station{
    height: 30px;
    box-shadow: 0px 0px 1px #c7254e;
    border-radius:5px;
    display:inline-block;
    padding:2px;
    cursor: pointer;
  }
  .station-content {
    line-height:30px;

  }
</style>
