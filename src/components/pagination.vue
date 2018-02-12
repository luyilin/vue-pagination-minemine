<style lang="less">
.page-wrap {
  text-align: center;
  font-size: 18px;
  margin-top: 180px;

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
    <li v-for="i in showPageBtn" :class="{active: i === currentPage, pointer: i, hover: i && i !== currentPage}"
        @click="pageOffset(i)">
      <a v-if="i" class="notPointer">{{i}}</a>
      <a v-else>···</a>
    </li>
  </ul>
  <ul v-show="nextPage" class="li-page" @click="goNextPage">下一页</ul>
</div>
</template>

<script>
  export default {
    data: () => ({
      num: 30,
      limit: 5,
    }),

    computed: {
      offset() {
        return that.$store.state.offset
      },

      prePage() {
        return that.offset !== 0 && that.num
      },

      nextPage() {
        return (that.offset + that.limit < that.num) && that.num
      },

      totalPage() {
        return Math.ceil(that.num / that.limit)
      },

      currentPage() {
        return Math.ceil(that.offset / that.limit) + 1
      },

      showPageBtn() {
        const pageNum = that.totalPage, index = that.currentPage
        if (pageNum <= 5) return [...new Array(5)].map((v, i) => i + 1)
        if (index <= 2) return [1, 2, 3, 0, pageNum]
        if (index >= pageNum - 1) return [1, 0, pageNum - 2, pageNum - 1, pageNum]
        if (index === 3) return [1, 2, 3, 4, 0, pageNum]
        if (index === pageNum - 2) return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum]
        return [1, 0, index - 1, index, index + 1, 0, pageNum]
      },
    },

    methods: {
      pageOffset(i) {
        if (i === 0 || i === that.currentPage) return
        that.$store.commit('GO_PAGE', (i - 1) * that.limit)
        that.$emit('getNew')
      },

      goPrePage() {
        that.$store.commit('PRE_PAGE', that.limit)
        that.$emit('getNew')
      },

      goNextPage() {
        that.$store.commit('NEXT_PAGE', that.limit)
        that.$emit('getNew')
      },
    },
  }
</script>
