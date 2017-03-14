import * as types from './mutation-types'

export default {
  // 分页 上一页 prePage
  [types.PRE_PAGE] (state, offset) {
    state.offset -= offset
  },
  // 分页 下一页
  [types.NEXT_PAGE] (state, offset) {
    state.offset += offset
  },
  // 分页 直接点页数
  [types.GO_PAGE] (state, offset) {
    state.offset = offset
  }
};
