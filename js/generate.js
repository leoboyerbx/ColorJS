
var generatePoints = function() {
	var text = '<div onclick="goto(0);" class="point select"></div>';
    for (var i=1; i < allslides.length; i++) {
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
    for (var i=0; i < allslides.length; i++) {
        color = allslides[i].style.backgroundColor;
        if (allslides[i].querySelector('h1')) {
        legend = allslides[i].querySelector('h1').innerHTML;
        } else {
            legend = "Slide " + i ;
        }
        thumbnails += '<div class="thumbnail" onclick="globalView(); goto(' + i + ');"><div class="picture" style="background-color: ' + color + ';"></div><div class="legende">'+ legend + '</div></div>';
    }
    document.querySelector('#thumblist').innerHTML = thumbnails;
};

