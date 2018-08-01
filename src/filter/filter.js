import vue from 'vue'

vue.filter('img_filter', function (url) {
  return 'https://elm.cangdu.org/img/' + url
})
