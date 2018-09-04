import Hammer from './hammer.min.js'
let qS = require('./modules/querySelector')

let slider = qS('#slider')
let allSlides = qS('.slide')
let allanimate
let scrolling = currentSlide = currentAnimate = remoteState = 0
let timeOut1
let timeOut2
let allpoints
let sendSlide


slider.addEventListener("wheel", function (ev) { //si la fenetre scrolling
    ev.preventDefault(); //on empêche de retester l'événement
    scrolling = ev.deltaY; //on récupère la valeur de scrolling
    if (scrolling > 0) { //si le scrolling est vers le bas, on appelle nextslide()
        next();
    } else { //si le scrolling est vers le haut, on appelle prevslide()
        prev();
    }
    allpoints[currentslide].classList.add('select');
});

document.addEventListener("mousemove", function () {
    window.clearTimeout(timeOut1);
    showInterface();
    timeOut1 = window.setTimeout(hideInterface, 4000);
});
slider.addEventListener("click", function () {
    window.clearTimeout(timeOut1);
    showInterface();
    timeOut1 = window.setTimeout(hideInterface, 4000);
});


let setPoint = function (value) {
    allpoints.forEach(function(e) {
        e.classList.remove('select')
    })
    allpoints[value].classList.add('select')
}


let startRemote = function () {
    remotestate = 1;

    let httpRequest = new XMLHttpRequest();
    let back;

    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            back = httpRequest.responseText;

            if (back != currentanimate) {
                gotoAnimate(back);
            }

            timeOut2 = window.setTimeout(startRemote, 200);
        }
    }
    httpRequest.open('GET', './remote/givestate.php', true);
    httpRequest.send();

    document.querySelector('#remote').classList.remove('fa-wifi');
    document.querySelector('#remote').classList.add('fa-lock');
}

let stopRemote = function () {
    remotestate = 0;
    window.clearTimeout(timeOut2);
    document.querySelector('#remote').classList.remove('fa-lock');
    document.querySelector('#remote').classList.add('fa-wifi');
}

let toggleRemote = function () {
    if (remotestate == 1) {
        stopRemote();
    } else {
        startRemote();
    }
}
 
let printSlideshow = function() {
    goto(0)
    document.querySelectorAll("[animate]").forEach(function(e) {
        e.classList.add('notransition')
        e.classList.add('current')
    })

    window.print()

}