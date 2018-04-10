var hideInterface = function () {
    document.querySelector('#points').classList.add('hidden');
    document.querySelector('#interface').classList.add('hidden');
    document.body.classList.add('nocursor');
}
var showInterface = function () {
    document.querySelector('#points').classList.remove('hidden');
    document.querySelector('#interface').classList.remove('hidden');
    document.body.classList.remove('nocursor');
}
var globalView = function () {
    slider.classList.toggle('globalview');
    for (var i = 0; i < allslides.length; i++) {
        allslides[i].classList.toggle('hidden');
    }
    document.querySelector('#points').classList.toggle('globalview');
    document.querySelector('#interface').classList.toggle('globalview');
    document.querySelector('#control').classList.toggle('globalview');
    document.querySelector('#interface span').classList.toggle('fa-play-circle-o');
    window.clearTimeout(timeOut1);
}
var next = function (bypass) {
    if (currentanimate == allanimate.length - 1) { //évite de chercher à dépasser le nombre de slides
        return false;
    } else {
        if (remotestate === 1 && !bypass) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', './remote/changestate.php?set=' + (currentanimate + 1), true)
            xhr.send()
        } else {
            var animElements = document.querySelectorAll('[anim-data="' + parseInt(currentanimate + 1) + '"]')

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

var prev = function (bypass) {
    if (currentanimate === 0) { //évite de chercher à dépasser le nombre de slides
        return false;

    } else {
        if (remotestate === 1 && !bypass) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', './remote/changestate.php?set=' + (currentanimate - 1), true)
            xhr.send()
        } else {
            var animElements = document.querySelectorAll('[anim-data="' + parseInt(currentanimate) + '"]')

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


var goto = function (num) {
    if (num == currentslide) {
        return false;
    } else {
        var start = currentanimate;
        var end = parseInt(allslides[num].getAttribute('anim-data'))
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
            var xhr = new XMLHttpRequest();
            xhr.open('GET', './remote/changestate.php?set=' + (currentanimate), true)
            xhr.send()
        }
    }
}



var gotoAnimate = function (num) {
    if (num == currentanimate) {
        return false;
    } else {
        var start = currentanimate;
        var end = num
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
