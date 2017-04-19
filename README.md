#### 前言

> 1. 使用 vue-cli 初始化项目 
> 2. 使用 vuex 管理数据
> 3. node v6.9.2，npm v3.10.9 

* 分页效果预览：
 [demo]()
![messagedboard](https://ooo.0o0.ooo/2017/04/19/58f7246807888.png)

#### 分页原理

  * 实现分页主要依靠两个参数，偏移量（offset）、限制数（limit）。点击分页发送 Ajax 请求，将这两个参数传给后端，后端从数据库筛选出对应的数据返回给前端，前端将获取到的数据添加到页面中，分页组件根据偏移量和限制数显示对应的页码，这是一个简单地实现分页的思路。

#### 分页类型

  * 分页一般分为两种类型，一种经常用于移动端的滚动加载，或是一个按钮点击即可加载更多。这种分页实现起来比较简单，前端仅需定义一个 offset 变量，每次 ajax 请求时 offset += limit，然后将获取到的内容 append 上去即可。
  * 另一种是显示总页数、当前页数、上一页、下一页按钮，且页数较多时将中间页数用省略号表示。这种分页实现起来稍微复杂一点，但用户体验更好，本文讨论的就是如何使用 vue 实现这样的分页组件。

#### 分页组件
  
* 创建 pagination.vue 文件。
  
  ```
  <template>
      <div class="page-wrap">
        <ul v-show="prePage" class="li-page" v-tap="{methods: goPrePage}">上一页</ul>
        <ul>
          <li v-for="i in showPageBtn" :class="{active: i === currentPage, pointer: i, hover: i && i !== currentPage}"
              v-tap="{methods: goPage, i: i}">
            <a v-if="i" class="notPointer">{{i}}</a>
            <a v-else>···</a>
          </li>
        </ul>
        <ul v-show="nextPage" class="li-page" v-tap="{methods: goNextPage}">下一页</ul>
      </div>
  </template>
  ```

* 组件的作用域是独立的，父组件通信通过 props 向其传递数据，分页组件通过 $emit 触发在父组件定义的事件实现和父组件的通信，因此预设从父组件获取到需显示的总数 num 为 30 , limit 为 5，当然你也可以随意设置这两个值～

    ```
    let that
    export default{
        data(){
          that = this
          return{
            num: 30,
            limit: 5
          }
        }
    }
    ```

* 计算几个变量，在这里可以使用 vue 的计算属性 computed
  * 总页数 totalPage 应该等于需显示的总数除以每页显示的个数，并向上取整，这个很好理解。

  ```
      computed: {
        totalPage() {
          return Math.ceil(that.num / that.limit)
        }
      }
  ```
  * 偏移量 offset，因为点击上下页、制定页码均会改变 offset 变量，父组件也需要用到这个变量发送 ajax 请求，因此使用 vuex 存储 offset。
  
  ```
      // pagination.vue
      computed: {
        offset() {
            return that.$store.state.offset
        }
      }
  ```
  
  * 当前页面 currentPage，当前页面是比较重要的一个变量，显示用户当前所处页数，已知偏移量和每页显示数量可以得出当前页面是二者的余数向上取整，因为页数不从0开始，因此

  ```
      computed: {
        currentPage() {
          return Math.ceil(that.offset / that.limit) + 1
        }
      }
  ```
  
  * 是否显示上一页按钮 prePage，因为在首页的时候偏移量为0，因此只要偏移量不等于0则当前页面肯定不在第一页，则显示上一页按钮，并且 num 不等于 0。
  
  ```
      coumputed: {
        prePage() {
          return that.offset !== 0 && that.num
        }
      }
  ```

  * 是否显示下一页按钮 nextPage，这个也很好理解，只要偏移量和每页显示的个数相加小于需显示的总数，则显示下一页按钮，并且 num 不等于 0。
 
  ```
      computed: {
        nextPage() {
          return (that.offset + that.limit < that.num) && that.num
        }
      }
  ```

  * 页码计算 showPageBtn，页码计算是这个分页组件的核心内容，基本思路是当总页数不大于5时，显示全部页码；当总页数大于5时，始终显示首尾页码，当当前页码距首页小于2时，显示前三页页码和省略号；当当前页码距尾页小于2时，显示后三页页码，当当前页码距首页等于2时，显示前四页页码和省略号；当当前页码距尾页等于2时，显示后四页页码和省略号；当当前页码距首页大于3且距尾页大于3时，显示当前页码和当前页码的前一页和后一页，两边各有一个省略号；在这里我们使用0代表省略号

  ```
      computed: {
        showPageBtn() {
            let pageNum = that.totalPage,
                index = that.currentPage,
                arr = []
            if (pageNum <= 5) {
              for(let i = 1; i <= pageNum; i++) {
                arr.push(i)
              }
              return arr
            }
            if (index <= 2) return [1,2,3,0,pageNum]
            if (index >= pageNum -1) return [1,0, pageNum -2, pageNum -1, pageNum]
            if (index === 3) return [1,2,3,4,0,pageNum]
            if (index === pageNum -2) return [1,0, pageNum-3, pageNum-2, pageNum-1, pageNum]
            return [1,0, index-1, index, index + 1, 0, pageNum]
          }
      }
  ```

* 跳转事件，分别点击上一页、下一页和指定页码。

```
    methods: {
      goPage(params) {
        if (params.i === 0 || params.i === that.currentPage) return
        that.$store.commit('GO_PAGE', (params.i-1) * that.limit)
        that.$emit('getNew')
      },
      goPrePage() {
        that.$store.commit('PRE_PAGE', that.limit)
        that.$emit('getNew')
      },
      goNextPage() {
        that.$store.commit('NEXT_PAGE', that.limit)
        that.$emit('getNew')
      }
    }
```

#### vuex 部分
  * 在此介绍一下 vuex 部分的实现，学习了二哲大大的 vuex 部分的结构。在 src 目录下（和 components 目录平级），新建 store 目录，其中 index.js 文件传入 mutation，初始化 vuex；
  ```
  // vuex store/index.js
    import Vue from 'vue'
    import Vuex from 'vuex'
    import mutations from './mutations'
    
    Vue.use(Vuex);
    
    const state = {
      offset: 0
    };
    
    export default new Vuex.Store({
      state,
      mutations
    })
  ```
  * mutation-types.js 记录所有的事件名，其实这个文件最大的好处是能让我们更直观地管理所有的 vuex 方法，它的优点会在项目复杂后凸显出来，项目复杂时我们可能会使用 vuex 存储很多数据、定义很多方法，这时 mutation-types.js 就能更好更直观地管理这些方法。这也是一种设计理念嘛，有利于后期维护。

  ```
  // mutation-types.js
      export const PRE_PAGE = 'PRE_PAGE'
      export const NEXT_PAGE = 'NEXT_PAGE'
      export const GO_PAGE = 'GO_PAGE'
  ```

  * mutation.js 这是 vuex 的核心文件，注册了实现的所有事件，我们定义了点击上一页、下一页和跳转到指定页面的方法。
  
  ```
  // mutation.js
    import * as types from './mutation-types'

    export default {
      // 分页 上一页
      [types.PRE_PAGE] (state, offset) {
        state.offset -= offset
      },
      // 分页 下一页
      [types.NEXT_PAGE] (state, offset) {
        state.offset += offset
      },
      // 分页 跳转到指定页码
      [types.GO_PAGE] (state, offset) {
        state.offset = offset
      }
    };
  ```
