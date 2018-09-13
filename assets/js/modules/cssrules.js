import qS from './querySelector'

let importCss = function(target, media) {
    let link = document.createElement('link')
    link.rel = "stylesheet"
    link.href = target
    
    if (media) link.media = media
    return link
}
class CssRules {
    static init () {
        let faCSS = 'https://cdn.colorjs.cf/v0.8/assets/fontawesome/css/fontawesome-all.css'
        let globalCSS = "https://cdn.colorjs.cf/v0.8/assets/css/colorjs.css"
        let printCSS = "https://cdn.colorjs.cf/v0.8/assets/css/print.css"
        let existingStyleSheet = document.querySelector('link') || document.querySelector('style')
        if (existingStyleSheet) {
            qS('head').insertBefore(importCss(globalCSS), existingStyleSheet)
            qS('head').insertBefore(importCss(faCSS), existingStyleSheet)
            qS('head').insertBefore(importCss(printCSS, 'print'), existingStyleSheet)

        } else {
            qS('head').appendChild(importCss(globalCSS))
            qS('head').appendChild(importCss(faCSS))
            qS('head').appendChild(importCss(printCSS, 'print'))
        }
    }
}

export default CssRules