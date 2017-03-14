module.exports = (function() {
  return {
    ajaxReturn: (ctx, resBody, overrideBody)=> {
      ctx.body =
        Object.assign(
          { success: !!resBody || !overrideBody, code: '200', data: resBody || '' },
          overrideBody
        )
      }
  }
})();

/**
 * e.g.
 * ajaxReturn(ctx) => { success: true, code: '200', data: '' }
 * ajaxReturn(ctx, true) => { success: true, code: '200', data: true }
 * ajaxReturn(ctx, false) => { success: true, code: '200', data: '' }
 * ajaxReturn(ctx, null) => { success: true, code: '200', data: '' }
 * ajaxReturn(ctx, { a: 1 }) => { success: true, code: '200', data: { a: 1 } }
 * ajaxReturn(ctx, false, { code: '404' }) => { success: false, code: '404', data: '' }
 */
