var slider = document.querySelector('#slider');
var scrolling = 0; //on inistialise scrolling
var currentslide = 0; //valeur de la slide actuelle
var allslides = document.querySelectorAll('.slide'); //tableau contenant toutes les slides
var allindependent = document.querySelectorAll('.independent');
var timeOut1;
var timeOut2;
var allpoints;
var remotestate = 0;
var sendSlide;


slider.addEventListener("wheel", function (ev) { //si la fenetre scrolling
    ev.preventDefault(); //on empêche de retester l'événement
    allpoints[currentslide].classList.remove('select');
    scrolling = ev.deltaY; //on récupère la valeur de scrolling
    if (scrolling > 0) { //si le scrolling est vers le bas, on appelle nextslide()
        nextslide();
    }
    else { //si le scrolling est vers le haut, on appelle prevslide()
        prevslide();
    }
    allpoints[currentslide].classList.add('select');
});

document.addEventListener("mousemove", function() {
    window.clearTimeout(timeOut1);
    showInterface();
    timeOut1 = window.setTimeout(hideInterface, 4000);
});
slider.addEventListener("click", function() {
    window.clearTimeout(timeOut1);
    showInterface();
    timeOut1 = window.setTimeout(hideInterface, 4000);
});
/*
slider.addEventListener("touchmove", function(ev) {
    ev.preventDefault();
    console.log(ev);
});
*/


var startRemote = function() {
  remotestate = 1;
  
  var httpRequest = new XMLHttpRequest();
  var back;
  
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4) {
      back = httpRequest.responseText;
      
      if (back != currentslide) {
        remoteGoto(back);
      }
    }
  }
  httpRequest.open('GET', './remote/givestate.php', true);
httpRequest.send();
  
    document.querySelector('#remote').classList.remove('fa-wifi');
    document.querySelector('#remote').classList.add('fa-lock');
  
  timeOut2 = window.setTimeout(startRemote, 200);
  
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
  }  else {
    startRemote();
  }
}


