<style lang="less">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #evanyou {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -10;
  }
</style>

<template>
  <div id="app" v-tap="{methods: changeBg}">
    <canvas id="evanyou"></canvas>
    <pagination></pagination>
  </div>
</template>

<script>
  import pagination from 'components/pagination.vue'

export default {
  data(){
    return {
    }
  },
  components: {
    pagination
  },
  methods: {
    changeBg() {
      var c = document.getElementsByTagName('canvas')[0];
      var x = c.getContext('2d'),
          pr = window.devicePixelRatio || 1,
          w = window.innerWidth,
          h = window.innerHeight,
          f = 90,
          q,
          m = Math,
          r = 0,
          u = m.PI*2,
          v = m.cos,
          z = m.random
          c.width = w*pr
          c.height = h*pr
          x.scale(pr, pr)
          x.globalAlpha = 0.6

      function d(i,j){
        x.beginPath()
        x.moveTo(i.x, i.y)
        x.lineTo(j.x, j.y)
        var k = j.x + (z()*2-0.25)*f,
            n = y(j.y)
        x.lineTo(k, n)
        x.closePath()
        r-=u/-50
        x.fillStyle = '#'+(v(r)*127+128<<16 | v(r+u/3)*127+128<<8 | v(r+u/3*2)*127+128).toString(16)
        x.fill()
        q[0] = q[1]
        q[1] = {x:k,y:n}
      }
      function y(p){
        var t = p + (z()*2-1.1)*f
        return (t>h||t<0) ? y(p) : t
      }

      x.clearRect(0,0,w,h)
      q=[{x:0,y:h*.7+f},{x:0,y:h*.7-f}]
      while(q[1].x<w+f) d(q[0], q[1])
    }
  }
}
</script>
