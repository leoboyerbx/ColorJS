import qS from './querySelector';

class Nav {
    /**
     * Initialiser les fonctions de navigation
     * @param {Object} slideShow 
     */
    static init(slideShow) {
        slideShow.next = function(bypass) {
        if (this.remoteState === 1 && !bypass) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', './remote/changestate.php?set=' + (this.currentAnimate + 1), true)
            xhr.send()
        } else {
            let animElements = qS('[anim-data="' + parseInt(this.currentAnimate + 1) + '"]', true)
            if (animElements) {
                for(let i = 0; i < animElements.length; i++) {
                    let e = animElements[i]
                    e.classList.add('current')
                    if (e.classList.contains('slide')) {
                        this.allSlides[this.currentSlide].classList.add('prev')
                        this.allSlides[this.currentSlide].classList.remove('current')
                        this.currentSlide++;
                        this.setPoint(this.currentSlide)
                    }
                }
                this.currentAnimate++;
            }
        }
    }

        slideShow.prev = function(bypass) {
            if (this.currentAnimate === 0) { //évite de chercher à dépasser le nombre de slides
                return false;
        
            } else {
                if (this.remoteState === 1 && !bypass) {
                    let xhr = new XMLHttpRequest();
                    xhr.open('GET', './remote/changestate.php?set=' + (this.currentAnimate - 1), true)
                    xhr.send()
                } else {
                    let animElements = qS('[anim-data="' + parseInt(this.currentAnimate) + '"]', true)
        
                    for(let i = 0; i < animElements.length; i++) {
                        let e = animElements[i]
                        e.classList.remove('current')
        
                        if (e.classList.contains('slide')) {
                            this.allSlides[this.currentSlide - 1].classList.add('current')
                            this.allSlides[this.currentSlide - 1].classList.remove('prev')
                            this.currentSlide--;
                            this.setPoint(this.currentSlide)
                        }
        
                    }
                    this.currentAnimate--;
                }
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
            qS('#points').classList.add('hidden');
            qS('#interface').classList.add('hidden');
            document.body.classList.add('nocursor');
        }
        slideShow.showInterface = function () {
            qS('#points').classList.remove('hidden');
            qS('#interface').classList.remove('hidden');
            document.body.classList.remove('nocursor');
        }

        slideShow.globalView = function() {
            this.slider.classList.toggle('globalview')
            for (let i = 0; i < this.allSlides.length; i++) {
                this.allSlides[i].classList.toggle('hidden')
            }
            qS('#points').classList.toggle('globalview')
            qS('#interface').classList.toggle('globalview')
            qS('#control').classList.toggle('globalview')
            document.querySelector('#interface span').classList.toggle('fa-play-circle-o')
            window.clearTimeout(this.timeOut1);
        }
    }
}

export default Nav