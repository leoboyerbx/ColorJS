import qS from './modules/querySelector'
import createElements from './modules/createElements'
import Nav from './modules/nav'
import Generate from './modules/generate'
import EventListeners from './modules/eventListeners'
import CssRules from './modules/cssrules'
import Sync from './modules/sync'

createElements().then(() => {
    CssRules.init()

    let slideShow = window.slideShow = {
        'slider': qS('#cjs-slider'),
        'scrolling': 0,
        'currentSlide': 0,
        'currentAnimate': 0,
        'allSlides': qS('.cjs-slide', true),
        'allAnimate': qS('[anim-data]', true),
        'remoteState': 0,
    }
    Generate.global(slideShow)
    let syncId = slideShow.slider.getAttribute('cjs-sync-id')
    if (syncId) {
        Sync.init(slideShow, syncId)
    }

    Nav.init(slideShow)
    // Remote.init(slideShow) //facultatif

    document.addEventListener('DOMContentLoaded', () => {
        Generate.generate(slideShow)
        EventListeners.init(slideShow)
    })
})