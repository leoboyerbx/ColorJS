import Hammer from './hammer.min.js'
import qS from './modules/querySelector'
import Nav from './modules/nav'

let slideShow = {
    'slider': qS('#slider'),
    'scrolling': 0,
    'currentSlide': 0,
    'currentAnimate': 0,
    'allSlides': qS('.slide'),
    'remoteState': 0,

    setPoint: function (value) {
        this.allPoints.forEach(function(e) {
            e.classList.remove('select')
        })
        this.allPoints[value].classList.add('select')
    }
}



slideShow.slider.addEventListener("wheel", function (ev) { //si la fenetre scroll
    ev.preventDefault(); //on empêche de retester l'événement
    slideShow.scrolling = ev.deltaY; //on récupère la valeur de scrolling
    if (slideShow.scrolling > 0) { //si le scrolling est vers le bas, on appelle nextslide()
        Nav.next(slideShow);
    } else { //si le scrolling est vers le haut, on appelle prevslide()
        Nav.prev(slideShow);
    }
    slideShow.allPoints[slideShow.currentSlide].classList.add('select');
});

document.addEventListener("mousemove", function () {
    window.clearTimeout(slideShow.timeOut1);
    Nav.showInterface();
    slideShow.timeOut1 = window.setTimeout(Nav.hideInterface, 4000);
});
slideShow.slider.addEventListener("click", function () {
    window.clearTimeout(slideShow.timeOut1);
    Nav.showInterface();
    slideShow.timeOut1 = window.setTimeout(Nav.hideInterface, 4000);
});



let startRemote = function () {
    slideShow.remoteState = 1;

    let httpRequest = new XMLHttpRequest();
    let back;

    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            back = httpRequest.responseText;

            if (back != slideShow.currentAnimate) {
                Nav.gotoAnimate(slideShow, back);
            }

            slideShow.timeOut2 = window.setTimeout(startRemote, 200);
        }
    }
    httpRequest.open('GET', './remote/givestate.php', true);
    httpRequest.send();

    document.querySelector('#remote').classList.remove('fa-wifi');
    document.querySelector('#remote').classList.add('fa-lock');
}

let stopRemote = function () {
    slideShow.remoteState = 0;
    window.clearTimeout(slideShow.timeOut2);
    document.querySelector('#remote').classList.remove('fa-lock');
    document.querySelector('#remote').classList.add('fa-wifi');
}

let toggleRemote = function () {
    if (slideShow.remoteState == 1) {
        stopRemote();
    } else {
        startRemote();
    }
}
 
let printSlideshow = function() {
    Nav.goto(slideShow, 0)
    document.querySelectorAll("[animate]").forEach(function(e) {
        e.classList.add('notransition')
        e.classList.add('current')
    })

    window.print()

}


let generatePoints = function () {
    let text = '<div onclick="goto(0);" class="point select"></div>';
    for (let i = 1; i < slideShow.allSlides.length; i++) {
        text += '<div onclick="goto(' + i + ');" class="point"></div>';
    }
    document.querySelector('#points').innerHTML = text;
    slideShow.allPoints = document.querySelectorAll('.point');
    slideShow.timeOut1 = window.setTimeout(Nav.hideInterface, 2000);
}
let generateThumbnails = function() {
    let thumbnails = "";
    let color;
    let legend;
    let image;
    for (let i=0; i < slideShow.allSlides.length; i++) {
        color = slideShow.allSlides[i].style.backgroundColor;
        if (slideShow.allSlides[i].querySelector('h1')) {
        legend = slideShow.allSlides[i].querySelector('h1').innerHTML;
        } else {
            legend = "Slide " + i ;
        }
        let getImage = slideShow.allSlides[i].querySelector('img');
        
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
    for (let i = 0; i < slideShow.allSlides.length; i++) {
        slideShow.allSlides[i].setAttribute('anim-data', increment);
        let animeElementsInSlide = slideShow.allSlides[i].querySelectorAll('[animate]');
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
    slideShow.allAnimate = document.querySelectorAll('[anim-data]');
}

document.addEventListener("keyup", function (ev) {
    slideShow.allPoints[slideShow.currentSlide].classList.remove('select');
    
    if (ev.keyCode == 37 || ev.keyCode == 38) {
        Nav.prev(slideShow);
    }
    else if (ev.keyCode == 39 || ev.keyCode == 40 || ev.keyCode == 32 || ev.keyCode == 13) {
        Nav.next(slideShow);
    }
    else if (ev.keyCode == 36) {
        Nav.goto(slideShow, 0);
    }
    else if (ev.keyCode == 27 || ev.keyCode == 72) {
        Nav.hideInterface();
    }
    else if (ev.keyCode == 115) {
        Nav.globalView(slideShow);
    }
    else if (ev.keyCode == 35) {
        Nav.goto(slideShow, slideShow.allSlides.length-1);
    }
    slideShow.allPoints[slideShow.currentSlide].classList.add('select');
    
})
document.addEventListener("keydown", function(ev) {
    if(ev.ctrlKey && ev.keyCode == 80){
        ev.preventDefault()
        printSlideshow()
}
})

let sliderHammer = new Hammer(slideShow.slider)

sliderHammer
  .on('swiperight', function () {
  Nav.prev(slideShow)
})
  .on('swipeleft', function () {
  Nav.next(slideShow)
})


document.addEventListener('DOMContentLoaded', () => {
    generatePoints(); generateThumbnails(); generateAnimData()
})