import Vue from 'vue'
import moment from 'moment'

Vue.filter('timeFormat', function (i) {
  return moment(i).format('YYYY-MM-DD HH:mm:ss')
})
