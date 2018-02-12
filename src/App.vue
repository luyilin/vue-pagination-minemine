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
.github-corner {
  svg {
    fill: #7ba6b3;
    color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
  }
  &:hover .octo-arm{
    animation:octocat-wave 560ms ease-in-out
  }
  @keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}
}
</style>

<template>
<div id="app" v-tap="{methods: changeBg}">
  <a href="https://github.com/luyilin/Minemine-pagination" target="_blank" class="github-corner"><svg width="80" height="80" viewBox="0 0 250 250"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>
  <canvas id="evanyou"></canvas>
  <pagination></pagination>
</div>
</template>

<script>
import pagination from 'components/pagination.vue'

export default {
components: {
  pagination,
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
