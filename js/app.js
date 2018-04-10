var slider = document.querySelector('#slider');
var scrolling = 0; //on inistialise scrolling
var currentslide = 0; //valeur de la slide actuelle
var currentanimate = 0;
var allslides = document.querySelectorAll('.slide'); //tableau contenant toutes les slides
var allanimate;
var timeOut1;
var timeOut2;
var allpoints;
var remotestate = 0;
var sendSlide;


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


var setPoint = function (value) {
    allpoints.forEach(function(e) {
        e.classList.remove('select')
    })
    allpoints[value].classList.add('select')
}


var startRemote = function () {
    remotestate = 1;

    var httpRequest = new XMLHttpRequest();
    var back;

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

var stopRemote = function () {
    remotestate = 0;
    window.clearTimeout(timeOut2);
    document.querySelector('#remote').classList.remove('fa-lock');
    document.querySelector('#remote').classList.add('fa-wifi');
}

var toggleRemote = function () {
    if (remotestate == 1) {
        stopRemote();
    } else {
        startRemote();
    }
}
 