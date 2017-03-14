<style lang="less">
  @import url('../../node_modules/maltoses/dist/maltose.min.css');
  .maltose-main {
    z-index: 2 !important;
  }
  .comment-wrap {
    position: relative;
    background-color: #fff;
    border-radius: 6px;
    color: #555;
    font-family: IndieFlower, senty, Helvetica, 'Hiragino Sans GB', Arial, 'Microsoft YaHei', sans-serif;
    padding: 15px 15px 12px;
    margin-bottom: 16px;
    letter-spacing: 1px;
    .title {
      margin-bottom: 10px;
      position: relative;
      line-height: 2.5;
      span {
        position: relative;
        z-index: 1;
        background-color: #fff;
        padding-right: 10px;
        svg {
          margin-right: 3px;
        }
      }
      p {
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 1px;
        margin-top: -3px;
        border-bottom: 1px dotted #ffd6c5;
      }
    }
    .comment-write {
      textarea {
        width: 100%;
        height: 100%;
        min-height: 80px;
        padding: 6px 10px;
        &:focus {
          border: 1px solid lightsalmon;
        }
      }
      .info {
        display: flex;
        margin: 10px auto 0;
        input {
          flex: 1;
          height: 30px;
          padding-left: 10px;
          &:nth-child(1) {
            margin-right: 5%;
          }
          &:focus {
            border: 1px solid #1ca9a3;
          }
        }
      }
      .submit {
        padding: 2px 10px;
        background-color: rgba(32, 188, 182, 0.8);
        border-radius: 3px;
        color: #fff;
        font-weight: bold;
        margin-top: 10px;
      }
    }
    .item {
      border-bottom: 1px dotted #ffd6c5;
      padding-bottom: 10px;
      margin-bottom: 10px;
      .header {
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          box-shadow: 0 2px 2px 0 rgba(0,0,0,.09), 0 3px 1px -2px rgba(0,0,0,.15), 0 1px 2px 0 rgba(0,0,0,.12);
          float: left;
          margin-right: 20px;
          user-select: none;
          &:hover {
            -webkit-animation: tada 1s;
            animation: tada 1s;
          }
        }
      }
      .msg {
        padding: 10px 5px 10px 80px;
        img {
          max-width: 150px;
          height: auto;
          border-radius: 5px;
        }
      }
      .reply {
        display: inline-block;
        line-height: 1.6;
        padding: 2px 6px 0;
        background-color: #bbe5f1;
        color: #fff;
        border-radius: 3px;
        margin-left: 80px;
        user-select: none;
      }
      .reply-wrap {
        margin: 12px 0 0 80px;
        overflow: hidden;
        input {
          width: 100%;
          height: 34px;
          padding: 5px 10px;
          margin-bottom: 10px;
          &:focus {
            border: 1px solid #a6dded;
          }
        }
        .info {
          display: flex;
          input {
            flex: 1;
            &:nth-child(1) {
              margin-right: 5%;
            }
          }
        }
        div {
          float: right;
          color: #666;
          padding: 3px 5px 0;
          line-height: 1.6;
          cursor: pointer;
          user-select: none;
        }
        .push {
          background-color: #bbe5f1;
          color: #fff;
          border-radius: 5px;
          margin-left: 15px;
        }
      }
      .reply-list {
        margin: 12px 0 0 80px;
        border-top: 1px dotted #ffd6c5;
        .rmsg {
          padding: 10px 5px 10px 0;
        }
        .rreply {
          margin-left: 0;
        }
        .rreply-wrap {
          margin: 12px auto 0;
        }
      }
    }
  }
  textarea {
    resize: none;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  input[type="text"], input[type="email"] {
    border: 1px solid #ddd;
    border-radius: 3px;
  }
  input, textarea, input::-webkit-input-placeholder, textarea::-webkit-input-placeholder{
    font-family: IndieFlower, senty, Helvetica, 'Hiragino Sans GB', Arial, 'Microsoft YaHei', sans-serif;
    font-size: 14px;
    letter-spacing: 1px;
  }
  .error::-webkit-input-placeholder {
    color: #f59b9d;
  }
</style>

<template>
  <div class="essay-wrap" :style="{width: message}">
    <div class="comment-wrap">
      <form method="post" @submit.prevent="onsubmit" class="comment-write">
        <textarea :placeholder="msg_holder" :class="{error: err}"></textarea>
        <div class="maltose"></div>
        <div class="info">
          <input type="text" name="author" :placeholder="author_holder" v-model.trim="author" :class="{error: err}" maxlength="30">
          <input type="email" name="email" :placeholder="email_holder" v-model.trim="email" :class="{error: err}" maxlength="40">
        </div>
        <input type="submit" name="submit" class="submit pointer" value="push">
      </form>
    </div>
    <div class="comment-wrap">
      <div class="title">
        <span>
          <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-chat"></use>
        </svg>
        {{num}}条萌萌哒评论
        </span>
        <p></p>
      </div>
      <div class="item" v-for="i, index in list">
        <div class="header">
          <img src="https://ooo.0o0.ooo/2017/02/08/589ac86c22008.jpg">
          <span>{{i.author}}</span>
          <span class="time">于{{i.time | timeFormat}}</span>
        </div>
        <div class="msg" v-html="i.msg"></div>
        <div class="reply pointer" @click="showReply(index, i.author)">回复</div>
        <div class="reply-wrap" v-show="index === show">
          <input type="text" name="reply" :placeholder="reply_msg_holder" v-model.trim="reply_msg" :class="{error: reply_err}">
          <section class="info">
            <input type="text" name="author" :placeholder="reply_author_holder" v-model.trim="reply_author" :class="{error: reply_err}" maxlength="30">
            <input type="email" name="email" :placeholder="reply_email_holder" v-model.trim="reply_email" :class="{error: reply_err}" maxlength="40">
          </section>
          <div class="push" @click="reply(i.id ,i.author)">评论</div>
          <div @click="cancel">取消</div>
        </div>
        <div class="reply-list" v-for="j, $index in rlist" v-show="j.father_id === i.id">
          <div class="header">
            <span>{{j.reply_author}}</span>
            <span>回复</span>
            <span>{{j.father_author}}</span>
            <span class="time">于{{j.time | timeFormat}}</span>
          </div>
          <div class="rmsg" v-html="j.reply_msg"></div>
          <div class="reply pointer rreply" @click="showRreply($index, j.reply_author)">回复</div>
          <div class="reply-wrap rreply-wrap" v-show="$index === rshow">
            <input type="text" name="reply" :placeholder="rreply_msg_holder" v-model.trim="rreply_msg" :class="{error: rreply_err}">
            <section class="info">
              <input type="text" name="author" :placeholder="reply_author_holder" v-model.trim="rreply_author" :class="{error: rreply_err}" maxlength="30">
              <input type="email" name="email" :placeholder="reply_email_holder" v-model.trim="rreply_email" :class="{error: rreply_err}" maxlength="40">
            </section>
            <div class="push" @click="rreply(i.id, j.reply_author)">评论</div>
            <div @click="rcancel">取消</div>
          </div>
        </div>
      </div>
      <pagination :num="levelNum" @getNew="getNewList"></pagination>
    </div>
  </div>
</template>

<script>
  import pagination from 'components/pagination.vue'
  let axios   = require('axios'),
      maltose = require('maltoses'),
      that

  let relpy_holder_reset = ()=> {
    that.reply_author_holder = '你的名字'
    that.reply_email_holder = '你的邮箱'
    that.reply_msg = ''
    that.reply_err = false
  }
  let rrelpy_holder_reset = ()=> {
    that.rreply_msg = ''
    that.rreply_err = false
  }

  let getList = (offset, limit)=> {
    axios.get('/msg/list', {
      baseURL: ApiPrefix,
      params: {
        offset: offset,
        limit: limit
      }
    }).then(function (response) {
        let i = response.data.data
        that.num = i.num
        that.levelNum = i.levelNum
        that.list = i.data.slice(offset, offset + limit)
        that.totalList = i.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  let getMsgList = ()=> {
    axios.get('/msg/msglist', {
      baseURL: ApiPrefix,
    }).then(function (response) {
        let i = response.data.data
        that.rlist = i.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  export default{
    created(){
      getList(this.offset, this.limit)
      getMsgList()
    },
    mounted(){
      let target = document.getElementsByTagName('textarea')[0],
      maltose_demo = new maltose({
        wrap: document.querySelector('.maltose'),
        target: target,
        width: '100%',
        maxHeight: '200px',
        api: 'https://luyilin.github.io/Maltose/demo/maltose.json'
      })
    },
    data(){
      that = this
      return{
        author: '',
        email: '',
        list: [],
        totalList: [],
        rlist: [],
        levelNum: 0,
        num: 0,
        msg_holder: 'something you want to say ...',
        author_holder: '你的名字',
        email_holder: '邮箱',
        err: false,
        show: -1,
        reply_msg: '',
        reply_author: '',
        reply_email: '',
        reply_msg_holder: '',
        reply_author_holder: '你的名字',
        reply_email_holder: '邮箱',
        reply_err: false,
        rreply_msg: '',
        rreply_author: '',
        rreply_email: '',
        rreply_msg_holder: '',
        rreply_err: false,
        rshow: -1,
        limit: 2
      }
    },
    computed: {
      offset() {
        return this.$store.state.offset
      }
    },
    props: ['message'],
    components: {
      pagination
    },
    methods: {
      getNewList() {
        that.list = that.totalList.slice(that.offset, that.offset + that.limit)
      },
      onsubmit() {
        let that = this,
            target = document.getElementsByTagName('textarea')[0],
            msg = target.value
        if (!msg || !that.author || !that.email) {
          that.msg_holder = '你是不是忘了说点什么๑(°ο°)๑'
          that.author_holder = '你的名字呢。。'
          that.email_holder = '你的邮箱呢。。'
          that.err = true
          return
        }
        axios({
          method: 'post',
          url: '/msg/add',
          baseURL: ApiPrefix,
          data: {
            msg: msg,
            author: that.author,
            email: that.email
          }
        })
        .then(function (response) {
          let i = response.data.data
          that.totalList.unshift(i.data)
          that.num = i.num
          that.levelNum = i.levelNum
          that.msg_holder = 'something you want to say ...'
          that.author_holder = '你的名字'
          that.email_holder = '邮箱'
          that.err = false
          target.value = ''
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      showReply(index, author) {
        if (that.show === index) return
        that.show = index
        that.reply_msg_holder = '回复' + author + ':'
        relpy_holder_reset()
      },
      showRreply(index, author) {
        if (that.rshow === index) return
        that.rshow = index
        that.rreply_msg_holder = '回复' + author + ':'
        rrelpy_holder_reset()
      },
      cancel() {
        that.show = -1
        relpy_holder_reset()
      },
      rcancel() {
        that.rshow = -1
        rrelpy_holder_reset()
      },
      reply(id, author) {
        if (!that.reply_msg || !that.reply_author || !that.reply_email) {
          that.reply_msg_holder = '你是不是忘了说点什么๑(°ο°)๑'
          that.reply_author_holder = '你的名字呢。。'
          that.reply_email_holder = '你的邮箱呢。。'
          that.reply_err = true
          return
        }
        axios({
          method: 'post',
          url: '/msg/reply',
          baseURL: ApiPrefix,
          data: {
            father_id: id,
            father_author: author,
            reply_msg: that.reply_msg,
            reply_author: that.reply_author,
            reply_email: that.reply_email
          }
        })
        .then(function(response) {
          let i = response.data.data
          that.rlist.push(i.data)
          that.num = i.num
          that.show = -1
          relpy_holder_reset()
        })
        .catch(function(error) {
          console.log(error)
        })
      },
      rreply(fa_id, fa_author) {
        if (!that.rreply_msg || !that.rreply_author || !that.rreply_author) {
          that.rreply_msg_holder = '你是不是忘了说点什么๑(°ο°)๑'
          that.reply_author_holder = '你的名字呢。。'
          that.reply_email_holder = '你的邮箱呢。。'
          that.rreply_err = true
          return
        }
        axios({
          method: 'post',
          url: '/msg/reply',
          baseURL: ApiPrefix,
          data: {
            father_id: fa_id,
            father_author: fa_author,
            reply_msg: that.rreply_msg,
            reply_author: that.rreply_author,
            reply_email: that.rreply_email
          }
        })
        .then(function(response) {
          let i = response.data.data
          that.rlist.push(i.data)
          that.num = i.num
          that.rshow = -1
          rrelpy_holder_reset()
        })
        .catch(function(error) {
          console.log(error)
        })
      }
    }
  }
</script>
