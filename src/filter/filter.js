import vue from 'vue'

vue.filter('img_filter', function (url) {
  url = !url ? 'https://elm.cangdu.org/img/default.jpg' : url
  return url
})

function handleUrl (url) {
  if (!url) {
    return
  }
  let str = 'http://fuss10.elemecdn.com/'
  str += url[0] + '/' + url[1] + url[2] + '/'
  str += url.slice(3)
  if (~url.indexOf('png')) {
    str += '.png'
  } else if (~url.indexOf('jpeg')) {
    str += '.jpeg'
  } else if (~url.indexOf('jpg')) {
    str += '.jpg'
  }
  return str
}

vue.filter('img_home', function (url) {
  url = handleUrl(url)
  url += '?imageMogr2/thumbnail/140x140/format/webp/quality/85'
  return url
})

vue.filter('img_icon', function (url) {
  url = handleUrl(url)
  url += '?imageMogr2/thumbnail/24x24/format/webp/quality/85'
  return url
})

vue.filter('img_strong', function (url) {
  return handleUrl(url)
})
