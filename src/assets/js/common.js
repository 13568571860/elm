export default {
  vp () {
    var wd = document.documentElement.clientWidth * window.devicePixelRatio / 10
    document.getElementsByTagName('html')[0].style.fontSize = wd + 'px'
    var scale = 1 / window.devicePixelRatio
    var mstr = 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no'
    document.getElementById('vp').content = mstr
  }
}
