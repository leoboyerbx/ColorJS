import qS from './querySelector';

class Nav {
    static next (slideShow, bypass) {
        if (slideShow.currentAnimate == slideShow.allAnimate.length - 1) { //évite de chercher à dépasser le nombre de slides
            return false;
        } else {
            if (slideShow.remoteState === 1 && !bypass) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', './remote/changestate.php?set=' + (slideShow.currentAnimate + 1), true)
                xhr.send()
            } else {
                var animElements = qS('[anim-data="' + parseInt(slideShow.currentAnimate + 1) + '"]', true)
    
                animElements.forEach(function (e) {
                    e.classList.add('current')
    
                    if (e.classList.contains('slide')) {
                        slideShow.allSlides[slideShow.currentSlide].classList.add('prev')
                        slideShow.allSlides[slideShow.currentSlide].classList.remove('current')
                        slideShow.currentSlide++;
                        slideShow.setPoint(slideShow.currentSlide)
                    }
                })
                slideShow.currentAnimate++;
            }
        }
    }
    static prev (slideShow, bypass) {
        if (slideShow.currentAnimate === 0) { //évite de chercher à dépasser le nombre de slides
            return false;
    
        } else {
            if (slideShow.remoteState === 1 && !bypass) {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', './remote/changestate.php?set=' + (slideShow.currentAnimate - 1), true)
                xhr.send()
            } else {
                let animElements = qS('[anim-data="' + parseInt(slideShow.currentAnimate) + '"]', true)
    
                animElements.forEach(function (e) {
                    e.classList.remove('current')
    
                    if (e.classList.contains('slide')) {
                        slideShow.allSlides[slideShow.currentSlide - 1].classList.add('current')
                        slideShow.allSlides[slideShow.currentSlide - 1].classList.remove('prev')
                        slideShow.currentSlide--;
                        slideShow.setPoint(slideShow.currentSlide)
                    }
    
                })
                slideShow.currentAnimate--;
            }
        }
    }
    static goto (slideShow, num) {
        if (num == slideShow.currentSlide) {
            return false;
        } else {
            let start = slideShow.currentAnimate;
            let end = parseInt(slideShow.allSlides[num].getAttribute('anim-data'))
            while (slideShow.currentAnimate != end) {
                if (start - end < 0) {
                    this.next(slideShow, 1)
                }
                else {
                    this.prev(slideShow, 1)
                }
            }
            slideShow.currentSlide = num;
            if(slideShow.remoteState === 1) {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', './remote/changestate.php?set=' + (slideShow.currentAnimate), true)
                xhr.send()
            }
        }
    }
    static gotoAnimate (slideShow ,num) {
        if (num == slideShow.currentAnimate) {
            return false;
        } else {
            let start = slideShow.currentAnimate;
            let end = num
            while (slideShow.currentAnimate != end) {
                if (start - end < 0) {
                    this.next(slideShow, 1)
                }
                else {
                    this.prev(slideShow, 1)
                }
            }
        }
    }

    static hideInterface () {
        qS('#points').classList.add('hidden');
        qS('#interface').classList.add('hidden');
        document.body.classList.add('nocursor');
    }
    static showInterface () {
        qS('#points').classList.remove('hidden');
        qS('#interface').classList.remove('hidden');
        document.body.classList.remove('nocursor');
    }
    static globalView (slideShow) {
        slideShow.slider.classList.toggle('globalview')
        for (let i = 0; i < slideShow.allSlides.length; i++) {
            slideShow.allSlides[i].classList.toggle('hidden')
        }
        qS('#points').classList.toggle('globalview')
        qS('#interface').classList.toggle('globalview')
        qS('#control').classList.toggle('globalview')
        document.querySelector('#interface span').classList.toggle('fa-play-circle-o')
        window.clearTimeout(slideShow.timeOut1);
    }
}

export default Nav