<style lang="less">
  body {
    background-color: #fff4f2;
  }
  .index-wrap {
    min-width: 400px;
    .content-wrap {
      width: 82%;
      margin: 30px auto;
    }
  }

</style>

<template>
  <div class="index-wrap">
    <div class="content-wrap">
      <message-board></message-board>
    </div>
  </div>
</template>

<script>
  import MessageBoard from 'components/message-board.vue'

  export default{
    data(){
      return{
      }
    },
    components: {
      MessageBoard
    },
    methods: {
    }
  }
</script>
