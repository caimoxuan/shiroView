<template>
  <div>
      <div id = "container" tabindex="0"></div>
      <div id = "refresh"><el-button @click="init">刷新</el-button></div>
  </div>

</template>

<script>
    import AMap from 'AMap'
    export default {
      mounted: function () {
        this.init()
      },
      methods : {
        init (){
          if(this.routeData.path){
            var line = this.routeData.path
            var stop = this.routeData.stations
            var polyline = new AMap.Polyline({
              path: line,
              strokeColor: '#3366FF',
              strokeOpacity: 1,
              strokeWeight: 5,
              strokeStyle: 'solid',
              strokeDasharray: [10, 5]
            })
            var map = new AMap.Map('container', {
              center: line[Math.floor(line.length / 2)],
              resizeEnable: true,
              zoom: 11
            })
            polyline.setMap(map)
            stop.forEach(function (item, index) {
              /* eslint-disable no-new */
              new AMap.Marker({
                map: map,
                icon: new AMap.Icon({
                  image: './static/img/stop.png',
                  size: new AMap.Size(32, 48),
                  imageOffset: new AMap.Pixel(0, 16)
                }),
                position: [item.lng, item.lat]
              })
            })
          }
        }
      },
      props: {
        routeData: Object
      }
    }
</script>

<style scoped>
  #container {
    height: 500px;
    width:100%;
  }
  #refresh{
    text-align:center;
    padding: 5px;
  }
</style>
