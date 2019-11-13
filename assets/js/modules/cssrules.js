import qS from './querySelector'

const importCss = function (target, media) {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = target
  link.type = 'text/css'
  if (media) link.media = media
  return link
}
class CssRules {
  static init () {
    const existingStyleSheet = document.querySelector('link') || document.querySelector('style')
    if (existingStyleSheet) {
      qS('head').insertBefore(importCss('assets/colorjs.bundle.css'), existingStyleSheet)
    } else {
      qS('head').appendChild(importCss('assets/colorjs.css'))
    }
  }
}

export default CssRules
