import qS from './modules/querySelector'
import createElements from './modules/createElements'
import Nav from './modules/nav'
import Generate from './modules/generate'
import EventListeners from './modules/eventListeners'
import CssRules from './modules/cssrules'
import speechControl from './modules/speechControl'

createElements().then(() => {
    CssRules.init()

    let slideShow = window.slideShow = {
        'slider': qS('#cjs-slider'),
        'scrolling': 0,
        'currentSlide': 0,
        'currentAnimate': 0,
        'allSlides': qS('.cjs-slide'),
        'allAnimate': document.querySelectorAll('[anim-data]'),
        'remoteState': 0,
    }
    Generate.global(slideShow)
    let speechLang = slideShow.slider.getAttribute('speech-lang')
    if (speechLang) {
        speechControl.init(slideShow, speechLang)
        slideShow.bindSpeech(slideShow.allSlides[0])
    }
    Nav.init(slideShow)
    // Remote.init(slideShow) //facultatif

    document.addEventListener('DOMContentLoaded', () => {
        Generate.generate(slideShow)
        EventListeners.init(slideShow)
    })
})