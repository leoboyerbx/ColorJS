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
});

var sliderHammer = new Hammer(slider)

sliderHammer
  .on('swiperight', function () {
  prev()
})
  .on('swipeleft', function () {
  next()
})