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
}
