import qS from './querySelector';

class Nav {
    /**
     * Initialiser les fonctions de navigation
     * @param {Object} slideShow 
     */
    static init(slideShow) {
        let nextEvent = new Event('cjsNext')
        let prevEvent = new Event('cjsPrev')

        slideShow.next = function() {
            let animElements = qS('[anim-data="' + parseInt(this.currentAnimate + 1) + '"]', true)
            if (animElements) {
                for(let i = 0; i < animElements.length; i++) {
                    let e = animElements[i]
                    e.classList.add('current')
                    if (e.classList.contains('cjs-slide')) {
                        this.allSlides[this.currentSlide].classList.add('prev')
                        this.allSlides[this.currentSlide].classList.remove('current')
                        this.currentSlide++;
                        this.setPoint(this.currentSlide)
                    }
                    if (e.tagName == "VIDEO" && e.getAttribute('cjs-autoplay') == "true") {
                        e.play()
                    }
                }
                this.currentAnimate++;
                slideShow.slider.dispatchEvent(nextEvent)
            }
    }

        slideShow.prev = function() {
            if (this.currentAnimate === 0) { //évite de chercher à dépasser le nombre de slides
                return false;
        
            } else {
                let animElements = qS('[anim-data="' + parseInt(this.currentAnimate) + '"]', true)
    
                for(let i = 0; i < animElements.length; i++) {
                    let e = animElements[i]
                    e.classList.remove('current')
    
                    if (e.classList.contains('cjs-slide')) {
                        this.allSlides[this.currentSlide - 1].classList.add('current')
                        this.allSlides[this.currentSlide - 1].classList.remove('prev')
                        this.currentSlide--;
                        this.setPoint(this.currentSlide)
                    }
    
                }
                this.currentAnimate--
                slideShow.slider.dispatchEvent(prevEvent)
            }
        }

        slideShow.goto = function(num) {
            if (num == this.currentSlide) {
                return false;
            } else {
                let start = this.currentAnimate
                let end = parseInt(this.allSlides[num].getAttribute('anim-data'))
                while (this.currentAnimate != end) {
                    if (start - end < 0) {
                        this.next(1)
                    }
                    else {
                        this.prev(1)
                    }
                }
                this.currentSlide = num;
                if(this.remoteState === 1) {
                    let xhr = new XMLHttpRequest();
                    xhr.open('GET', './remote/changestate.php?set=' + (this.currentAnimate), true)
                    xhr.send()
                }
            }
        }

        slideShow.gotoAnimate = function(num) {
            if (num == slideShow.currentAnimate) {
                return false;
            } else {
                let start = this.currentAnimate;
                let end = num
                while (this.currentAnimate != end) {
                    if (start - end < 0) {
                        this.next(this, 1)
                    }
                    else {
                        this.prev(this, 1)
                    }
                }
            }
        }

        slideShow.hideInterface = function() {
            qS('#cjs-points').classList.add('hidden');
            qS('#cjs-interface').classList.add('hidden');
            document.body.classList.add('nocursor');
        }
        slideShow.showInterface = function () {
            qS('#cjs-points').classList.remove('hidden');
            qS('#cjs-interface').classList.remove('hidden');
            document.body.classList.remove('nocursor');
        }

        slideShow.globalView = function() {
            this.slider.classList.toggle('globalview')
            for (let i = 0; i < this.allSlides.length; i++) {
                this.allSlides[i].classList.toggle('hidden')
            }
            qS('#cjs-points').classList.toggle('globalview')
            qS('#cjs-interface').classList.toggle('globalview')
            qS('#cjs-control').classList.toggle('globalview')
            document.querySelector('#cjs-interface span').classList.toggle('fa-play-circle-o')
            window.clearTimeout(this.timeOut1);
        }
    }
}

export default Nav