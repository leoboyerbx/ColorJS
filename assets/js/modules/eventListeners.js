import Hammer from './hammer.min.js'
import qS from './querySelector'

class EventListeners {
    static init (slideShow) {
        slideShow.slider.addEventListener("wheel", function (ev) { //si la fenetre scroll
            ev.preventDefault(); //on empêche de retester l'événement
            slideShow.scrolling = ev.deltaY; //on récupère la valeur de scrolling
            if (slideShow.scrolling > 0) { //si le scrolling est vers le bas, on appelle nextslide()
                slideShow.next()
            } else { //si le scrolling est vers le haut, on appelle prevslide()
                slideShow.prev()
            }
            slideShow.allPoints[slideShow.currentSlide].classList.add('select');
        });

        document.addEventListener("mousemove", function () {
            window.clearTimeout(slideShow.timeOut1);
            slideShow.showInterface();
            slideShow.timeOut1 = window.setTimeout(slideShow.hideInterface, 4000);
        });
        slideShow.slider.addEventListener("click", function () {
            window.clearTimeout(slideShow.timeOut1)
            slideShow.showInterface()
            slideShow.timeOut1 = window.setTimeout(slideShow.hideInterface, 4000)
        })

        // Keyboard Events
        document.addEventListener("keyup", function (ev) {
            slideShow.allPoints[slideShow.currentSlide].classList.remove('select');
            
            if (ev.keyCode == 37 || ev.keyCode == 38) {
                slideShow.prev();
            }
            else if (ev.keyCode == 39 || ev.keyCode == 40 || ev.keyCode == 32 || ev.keyCode == 13) {
                slideShow.next();
            }
            else if (ev.keyCode == 36) {
                slideShow.goto(0);
            }
            else if (ev.keyCode == 27 || ev.keyCode == 72) {
                slideShow.hideInterface();
            }
            else if (ev.keyCode == 115) {
                slideShow.globalView();
            }
            else if (ev.keyCode == 35) {
                slideShow.goto(slideShow.allSlides.length-1);
            }
            else if (ev.key == "r") {
                ev.preventDefault()
                window.location.href="./force-ratio.html"
            }
            slideShow.allPoints[slideShow.currentSlide].classList.add('select');
            
        })
        document.addEventListener("keydown", function(ev) {
            if(ev.ctrlKey && ev.keyCode == 80){
                ev.preventDefault()
                slideShow.print()
            }
            if(ev.ctrlKey && ev.keyCode == 83){
                ev.preventDefault()
                slideShow.save()
            }
        })
        
        let sliderHammer = new Hammer(slideShow.slider)
        
        sliderHammer
          .on('swiperight', function () {
          slideShow.prev()
        })
          .on('swipeleft', function () {
          slideShow.next()
        })


        // Eventlisteners dans le code
        // qS('[cjs-action]', true).forEach(element => {
        //     let action = element.getAttribute('cjs-action')

        //     let setAction(content) {
        //         element.addEventListener('click', ev => {
        //             ev.preventDefault()
        //            content()
        //         })
        //     }

        //     switch (action) {
        //         case 'prev':
        //             setEventListener(() => {slideShow.prev()})
        //         case 'next':
        //             setEventListener(() => {slideShow.next()})
        //         case '':
        //             setEventListener(() => {slideShow.next()})
        //     }
            
            
        // })
    }
}

export default EventListeners