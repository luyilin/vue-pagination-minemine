import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import comment from 'tpl/comment.vue'

NProgress.configure({showSpinner: false });

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'comment',
    component: comment,
    meta: {
      title: 'Minemine'
    }
  }]
})

router.beforeEach((to, from, next) => {
  let title = to.meta.title || 'Minemine'
  document.title = title
  var titleTime
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      document.title = '(•̀ ᴗ •́)✧ 土遁·隐身术~ ' + title
      clearTimeout(titleTime);
    }
    else {
      document.title = '(≧▽≦) 影束缚术~ ' + title
      titleTime = setTimeout(function() {
        document.title = title;
      }, 1500);
    }
  });
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})

export default router
