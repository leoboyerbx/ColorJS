import Hammer from './hammer.min.js'
import qS from './modules/querySelector'


let slider = qS('#slider')
let scrolling = 0; //on inistialise scrolling
let currentslide = 0; //valeur de la slide actuelle
let currentanimate = 0;
let allslides = qS('.slide'); //tableau contenant toutes les slides
let allanimate;
let timeOut1;
let timeOut2;
let allpoints;
let remotestate = 0;



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


let generatePoints = function () {
    let text = '<div onclick="goto(0);" class="point select"></div>';
    for (let i = 1; i < allslides.length; i++) {
        text += '<div onclick="goto(' + i + ');" class="point"></div>';
    }
    document.querySelector('#points').innerHTML = text;
    allpoints = document.querySelectorAll('.point');
    timeOut1 = window.setTimeout(hideInterface, 2000);
}
let generateThumbnails = function() {
    let thumbnails = "";
    let color;
    let legend;
    let image;
    for (let i=0; i < allslides.length; i++) {
        color = allslides[i].style.backgroundColor;
        if (allslides[i].querySelector('h1')) {
        legend = allslides[i].querySelector('h1').innerHTML;
        } else {
            legend = "Slide " + i ;
        }
        let getImage = allslides[i].querySelector('img');
        
        if (getImage) {
            image = getImage.src;
            image = '<img src="' + image + '" class="thumbnailimage">'
        }
        else {
            image = "";
        }
        
        
        thumbnails += '<div class="thumbnail" onclick="globalView(); goto(' + i + ');"><div class="picture" style="background-color: ' + color + ';">' + image + ' </div><div class="legende">'+ legend + '</div></div>';
    }
    document.querySelector('#thumblist').innerHTML = thumbnails;
};

let generateAnimData = function () {
    let increment = 0;
    for (let i = 0; i < allslides.length; i++) {
        allslides[i].setAttribute('anim-data', increment);
        let animeElementsInSlide = allslides[i].querySelectorAll('[animate]');
        let lastestAnimation = 0;
        for (let j = 0; j < animeElementsInSlide.length; j++) {
            let element = animeElementsInSlide[j];
            let elementAnim = Number(element.getAttribute('animate'));
            element.setAttribute('anim-data', increment + elementAnim);
            if (elementAnim > lastestAnimation) {
                lastestAnimation = elementAnim
            }
        }
        
        increment += lastestAnimation + 1; 
    }

    document.querySelectorAll('[anim-data="0"]').forEach(function (el) {el.classList.add('current')})
    allanimate = document.querySelectorAll('[anim-data]');
}

document.addEventListener("keyup", function (ev) {
    allpoints[currentslide].classList.remove('select');
    
    if (ev.keyCode == 37 || ev.keyCode == 38) {
        prev();
    }
    else if (ev.keyCode == 39 || ev.keyCode == 40 || ev.keyCode == 32 || ev.keyCode == 13) {
        next();
    }
    else if (ev.keyCode == 36) {
        goto(0);
    }
    else if (ev.keyCode == 27 || ev.keyCode == 72) {
        hideInterface();
    }
    else if (ev.keyCode == 115) {
        globalView();
    }
    else if (ev.keyCode == 35) {
        goto(allslides.length-1);
    }
    allpoints[currentslide].classList.add('select');
    
})
document.addEventListener("keydown", function(ev) {
    if(ev.ctrlKey && ev.keyCode == 80){
        ev.preventDefault()
        printSlideshow()
}
})

let sliderHammer = new Hammer(slider)

sliderHammer
  .on('swiperight', function () {
  prev()
})
  .on('swipeleft', function () {
  next()
})

let hideInterface = function () {
    document.querySelector('#points').classList.add('hidden');
    document.querySelector('#interface').classList.add('hidden');
    document.body.classList.add('nocursor');
}
let showInterface = function () {
    document.querySelector('#points').classList.remove('hidden');
    document.querySelector('#interface').classList.remove('hidden');
    document.body.classList.remove('nocursor');
}
let globalView = function () {
    slider.classList.toggle('globalview');
    for (let i = 0; i < allslides.length; i++) {
        allslides[i].classList.toggle('hidden');
    }
    document.querySelector('#points').classList.toggle('globalview');
    document.querySelector('#interface').classList.toggle('globalview');
    document.querySelector('#control').classList.toggle('globalview');
    document.querySelector('#interface span').classList.toggle('fa-play-circle-o');
    window.clearTimeout(timeOut1);
}
let next = function (bypass) {
    if (currentanimate == allanimate.length - 1) { //évite de chercher à dépasser le nombre de slides
        return false;
    } else {
        if (remotestate === 1 && !bypass) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', './remote/changestate.php?set=' + (currentanimate + 1), true)
            xhr.send()
        } else {
            let animElements = document.querySelectorAll('[anim-data="' + parseInt(currentanimate + 1) + '"]')

            animElements.forEach(function (e) {
                e.classList.add('current')

                if (e.classList.contains('slide')) {
                    allslides[currentslide].classList.add('prev')
                    allslides[currentslide].classList.remove('current')
                    currentslide++;
                    setPoint(currentslide)
                }
            })
            currentanimate++;
        }
    }
}

let prev = function (bypass) {
    if (currentanimate === 0) { //évite de chercher à dépasser le nombre de slides
        return false;

    } else {
        if (remotestate === 1 && !bypass) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', './remote/changestate.php?set=' + (currentanimate - 1), true)
            xhr.send()
        } else {
            let animElements = document.querySelectorAll('[anim-data="' + parseInt(currentanimate) + '"]')

            animElements.forEach(function (e) {
                e.classList.remove('current')

                if (e.classList.contains('slide')) {
                    allslides[currentslide - 1].classList.add('current')
                    allslides[currentslide - 1].classList.remove('prev')
                    currentslide--;
                    setPoint(currentslide)
                }

            })
            currentanimate--;
        }
    }
}


let goto = function (num) {
    if (num == currentslide) {
        return false;
    } else {
        let start = currentanimate;
        let end = parseInt(allslides[num].getAttribute('anim-data'))
        while (currentanimate != end) {
            if (start - end < 0) {
                next(1)
            }
            else {
                prev(1)
            }
        }
        currentslide = num;
        if(remotestate === 1) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', './remote/changestate.php?set=' + (currentanimate), true)
            xhr.send()
        }
    }
}



let gotoAnimate = function (num) {
    if (num == currentanimate) {
        return false;
    } else {
        let start = currentanimate;
        let end = num
        while (currentanimate != end) {
            if (start - end < 0) {
                next(1)
            }
            else {
                prev(1)
            }
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    generatePoints(); generateThumbnails(); generateAnimData()
})