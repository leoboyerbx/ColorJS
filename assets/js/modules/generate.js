const generatePoints = function (slideShow) {
    let text = '<div onclick="window.slideShow.goto(0);" class="point select"></div>';
    for (let i = 1; i < slideShow.allSlides.length; i++) {
        text += '<div onclick="window.slideShow.goto(' + i + ');" class="point"></div>';
    }
    document.querySelector('#points').innerHTML = text;
    slideShow.allPoints = document.querySelectorAll('.point');
    slideShow.timeOut1 = window.setTimeout(slideShow.hideInterface, 2000);
}
const generateThumbnails = function(slideShow) {
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
        
        
        thumbnails += '<div class="thumbnail" onclick="window.slideShow.globalView(); window.slideShow.goto(' + i + ');"><div class="picture" style="background-color: ' + color + ';">' + image + ' </div><div class="legende">'+ legend + '</div></div>';
    }
    document.querySelector('#thumblist').innerHTML = thumbnails;
};

const generateAnimData = function (slideShow) {
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
    slideShow.allAnimate = document.querySelectorAll('[anim-data]')
}

class Generate {
    /**
     * Fonction qui g&nère les points, les thumbnails et les AnimData
     * @param {Object} slideShow Objet
     */
    static generate(slideShow) {
        generatePoints(slideShow)
        generateThumbnails(slideShow)
        generateAnimData(slideShow)
    }

    /**
     * Fonction qui ajoute à l'objet slideShow les méthodes sans catégorie
     * @param {Object} slideShow Objet
     */
    static global (slideShow) {
        slideShow.print = function() {
            this.goto(0)
            document.querySelectorAll("[animate]").forEach(function(e) {
                e.classList.add('notransition')
                e.classList.add('current')
            })
        
            window.print()
        
        }
        slideShow.setPoint = function (value) {
            this.allPoints.forEach(function(e) {
                e.classList.remove('select')
            })
            this.allPoints[value].classList.add('select')
        }
    }
}

export default Generate