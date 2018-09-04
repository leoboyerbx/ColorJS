
var generatePoints = function () {
    var text = '<div onclick="goto(0);" class="point select"></div>';
    for (var i = 1; i < allslides.length; i++) {
        text += '<div onclick="goto(' + i + ');" class="point"></div>';
    }
    document.querySelector('#points').innerHTML = text;
    allpoints = document.querySelectorAll('.point');
    timeOut1 = window.setTimeout(hideInterface, 2000);
}
var generateThumbnails = function() {
    var thumbnails = "";
    var color;
    var legend;
    var image;
    for (var i=0; i < allslides.length; i++) {
        color = allslides[i].style.backgroundColor;
        if (allslides[i].querySelector('h1')) {
        legend = allslides[i].querySelector('h1').innerHTML;
        } else {
            legend = "Slide " + i ;
        }
        var getImage = allslides[i].querySelector('img');
        
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

var generateAnimData = function () {
    var increment = 0;
    for (var i = 0; i < allslides.length; i++) {
        allslides[i].setAttribute('anim-data', increment);
        var animeElementsInSlide = allslides[i].querySelectorAll('[animate]');
        var lastestAnimation = 0;
        for (var j = 0; j < animeElementsInSlide.length; j++) {
            var element = animeElementsInSlide[j];
            var elementAnim = Number(element.getAttribute('animate'));
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