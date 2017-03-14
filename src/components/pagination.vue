<style lang="less">
  .page-wrap {
    text-align: center;
    font-size: 18px;
    margin-top: 12px;
    ul {
      display: inline-block;
      list-style: none;
      overflow: hidden;
      li {
        float: left;
        color: #1e5a6b;
        padding: 1px 10px;
        margin: 0 5px;
        border-radius: 50%;
        user-select: none;
        border: 1px solid transparent;
      }
    }
    .pointer {
      cursor: pointer;
    }
    .hover {
      &:hover {
        border-color: #7ba6b3;
      }
    }
    .li-page {
      line-height: 1.5;
      cursor: pointer;
      color: #1e5a6b;
      &:hover {
        color: #7ba6b3;
      }
    }
    .active {
      border-color: #246c81;
    }
  }
</style>

<template>
  <div class="page-wrap">
    <ul v-show="prePage" class="li-page" @click="goPrePage">上一页</ul>
    <ul>
      <li v-for="i in showPageBtn" :class="{active: i === currentPage, pointer: i, hover: i && i !== currentPage}" @click="pageOffset(i)">
        <a v-if="i" class="notPointer">{{i}}</a>
        <a v-else>···</a>
      </li>
    </ul>
    <ul v-show="nextPage" class="li-page" @click="goNextPage">下一页</ul>
  </div>

</template>

<script>
  let that
  export default{
    data(){
      that = this
      return{
        limit: 2
      }
    },
    props: ['num'],
    computed: {
      offset() {
        return this.$store.state.offset
      },
      prePage() {
        return this.offset !== 0 || this.num <= this.limit
      },
      nextPage() {
        return this.offset + this.limit < this.num
      },
      totalPage() {
        return Math.ceil(this.num / this.limit)
      },
      currentPage() {
        return Math.ceil(this.offset / this.limit) + 1
      },
      showPageBtn() {
        let num = this.totalPage,
            index = this.currentPage,
            arr = []
        if (num <= 5) {
          for(let i = 1; i <= num; i++) {
            arr.push(i)
          }
          return arr
        }
        if (index <= 2) return [1,2,3,0,num]
        if (index >= num -1) return [1,0, num -2, num -1, num]
        if (index === 3) return [1,2,3,4,0,num]
        if (index === num -2) return [1,0, num-3, num-2, num-1, num]
        return [1,0, index-1, index, index + 1, 0, num]
      }
    },
    methods: {
      pageOffset(i) {
        if (i === 0 || i === that.currentPage) return
        this.$store.commit('GO_PAGE', (i-1) * that.limit)
        this.$emit('getNew')
      },
      goPrePage() {
        this.$store.commit('PRE_PAGE', that.limit)
        this.$emit('getNew')
      },
      goNextPage() {
        this.$store.commit('NEXT_PAGE', that.limit)
        this.$emit('getNew')
      }
    }
  }
</script>
