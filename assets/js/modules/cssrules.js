import qS from './querySelector'

let importCss = function(target, media) {
    let link = document.createElement('link')
    link.rel = "stylesheet"
    link.href = target
    link.type = 'text/css'
    if (media) link.media = media
    return link
}
class CssRules {
    static init () {
        let existingStyleSheet = document.querySelector('link') || document.querySelector('style')
        if (existingStyleSheet) {
            qS('head').insertBefore(importCss('assets/css/global.css'), existingStyleSheet)
            qS('head').insertBefore(importCss('assets/css/slides.css'), existingStyleSheet)
            qS('head').insertBefore(importCss('assets/css/print.css', 'print'), existingStyleSheet)

        } else {
            qS('head').appendChild(importCss('assets/css/global.css'))
            qS('head').appendChild(importCss('assets/css/slides.css'))
            qS('head').appendChild(importCss('assets/css/print.css', 'print'))
        }
    }
}

export default CssRules