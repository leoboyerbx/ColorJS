import qS from './querySelector'

let isAnimating = false

class Nav {
  /**
     * Initialiser les fonctions de navigation
     * @param {Object} slideShow
     */
  static init (slideShow) {
    function startAnimationLock () {
      isAnimating = true
      slideShow.afterAnimation(() => {
        isAnimating = false
      })
    }

    slideShow.next = function (emitEvent = true) {
      const animElements = qS('[anim-data="' + parseInt(this.currentAnimate + 1) + '"]', true)
      if (animElements && !isAnimating) {
        for (let i = 0; i < animElements.length; i++) {
          const e = animElements[i]
          e.classList.add('current')
          if (e.classList.contains('cjs-slide')) {
            this.allSlides[this.currentSlide].classList.add('prev')
            this.allSlides[this.currentSlide].classList.remove('current')
            this.currentSlide++
            this.setPoint(this.currentSlide)
          }
          if (e.tagName === 'VIDEO' && e.getAttribute('cjs-autoplay') === 'true') {
            e.play()
          }
        }
        this.currentAnimate++
        startAnimationLock()
        // eslint-disable-next-line no-undef
        const nextEvent = new CustomEvent('cjsSwitch', { detail: { direction: 'next', emitEvent: emitEvent } })
        slideShow.slider.dispatchEvent(nextEvent)
      }
    }

    slideShow.prev = function (emitEvent = true) {
      if (this.currentAnimate === 0 || isAnimating) { // évite de chercher à dépasser le nombre de slides
        return false
      } else {
        const animElements = qS('[anim-data="' + parseInt(this.currentAnimate) + '"]', true)

        for (let i = 0; i < animElements.length; i++) {
          const e = animElements[i]
          e.classList.remove('current')

          if (e.classList.contains('cjs-slide')) {
            this.allSlides[this.currentSlide - 1].classList.add('current')
            this.allSlides[this.currentSlide - 1].classList.remove('prev')
            this.currentSlide--
            this.setPoint(this.currentSlide)
          }
        }
        this.currentAnimate--
        startAnimationLock()
        // eslint-disable-next-line no-undef
        const prevEvent = new CustomEvent('cjsSwitch', { detail: { direction: 'prev', emitEvent: emitEvent } })
        slideShow.slider.dispatchEvent(prevEvent)
      }
    }

    slideShow.goto = function (num) {
      if (num === this.currentSlide) {
        return false
      } else {
        const start = this.currentAnimate
        const end = parseInt(this.allSlides[num].getAttribute('anim-data'))
        while (this.currentAnimate !== end) {
          if (start - end < 0) {
            this.next(false)
          } else {
            this.prev(false)
          }
        }
        this.currentSlide = num
        // eslint-disable-next-line no-undef
        const goingTo = new CustomEvent('cjsGoto', { detail: { slideNum: num } })
        slideShow.slider.dispatchEvent(goingTo)
      }
    }

    slideShow.gotoAnimate = function (num) {
      if (num === slideShow.currentAnimate) {
        return false
      } else {
        const start = this.currentAnimate
        const end = num
        while (this.currentAnimate !== end) {
          if (start - end < 0) {
            this.next(false)
          } else {
            this.prev(false)
          }
        }
      }
    }

    slideShow.hideInterface = function () {
      qS('#cjs-points').classList.add('hidden')
      qS('#cjs-interface').classList.add('hidden')
      document.body.classList.add('nocursor')
    }
    slideShow.showInterface = function () {
      qS('#cjs-points').classList.remove('hidden')
      qS('#cjs-interface').classList.remove('hidden')
      document.body.classList.remove('nocursor')
    }

    slideShow.globalView = function () {
      this.slider.classList.toggle('globalview')
      for (let i = 0; i < this.allSlides.length; i++) {
        this.allSlides[i].classList.toggle('hidden')
      }
      qS('#cjs-points').classList.toggle('globalview')
      qS('#cjs-interface').classList.toggle('globalview')
      qS('#cjs-control').classList.toggle('globalview')
      document.querySelector('#cjs-interface span').classList.toggle('fa-play-circle-o')
      window.clearTimeout(this.timeOut1)
    }
  }
}

export default Nav
