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
            qS('head').insertBefore(importCss('assets/css/colorjs.css'), existingStyleSheet)
            qS('head').insertBefore(importCss('assets/fontawesome/css/fontawesome-all.css'), existingStyleSheet)
            qS('head').insertBefore(importCss('assets/css/print.css', 'print'), existingStyleSheet)

        } else {
            qS('head').appendChild(importCss('assets/css/colorjs.css'))
            qS('head').appendChild(importCss('assets/fontawesome/css/fontawesome-all.css'))
            qS('head').appendChild(importCss('assets/css/print.css', 'print'))
        }
    }
}

export default CssRules