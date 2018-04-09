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
var globalView = function() {
    slider.classList.toggle('globalview');
    for (var i=0; i < allslides.length; i++) {
        allslides[i].classList.toggle('hidden');
    }
    document.querySelector('#points').classList.toggle('globalview');
    document.querySelector('#interface').classList.toggle('globalview');
    document.querySelector('#control').classList.toggle('globalview');
    document.querySelector('#interface span').classList.toggle('fa-play-circle-o');
    window.clearTimeout(timeOut1);
}

var nextslide = function() {
  
    if (remotestate === 0) { //Si on est en mode indépendant
      if(currentslide == allslides.length-1) { //évite de chercher à dépasser le nombre de slides
          return false;
      }
      else {
          allslides[currentslide].classList.add('prev');
          allslides[currentslide].classList.remove('current');
          allslides[currentslide + 1].classList.add('current');
          currentslide++; 

          var content = allslides[currentslide].querySelectorAll('.animate');
          for (var i = 0; i < content.length; i++) {
              content[i].classList.add('current');
          }
          for (var i = 0 ; i < allindependent.length; i++) {
              allindependent[i].classList.remove('slide' + (currentslide -1));
              allindependent[i].classList.add('slide' + currentslide);
          }

          content = allslides[currentslide -1 ].querySelectorAll('.animate');
          for (var i = 0; i < content.length; i++) {
              content[i].classList.remove('current');
          }
      }
  } else{  //Sinon, si on est connecté avec le serveur
    if(currentslide == allslides.length-1) { //évite de chercher à dépasser le nombre de slides
          return false;
      }
    else {
        sendSlide = currentslide + 1;
  var httpRequest = new XMLHttpRequest();
      
        httpRequest.open('GET', './remote/changestate.php?set=' + sendSlide, true);
      httpRequest.send();
    }
    }
}
var prevslide = function () {
    if (remotestate === 0) { //Si on est en mode indépendant
      if (currentslide === 0) {
          return false;
      }
      else {
          allslides[currentslide - 1].classList.remove('prev');
          allslides[currentslide - 1].classList.add('current');
          allslides[currentslide].classList.remove('current');


          currentslide--;

          var content = allslides[currentslide].querySelectorAll('.animate');
          for (var i = 0; i < content.length; i++) {
              content[i].classList.add('current');
          }

          content = allslides[currentslide +1 ].querySelectorAll('.animate');
          for (var i = 0; i < content.length; i++) {
              content[i].classList.remove('current');
          }

          for (var i = 0 ; i < allindependent.length; i++) {
              allindependent[i].classList.remove('slide' + (currentslide +1));
              allindependent[i].classList.add('slide' + currentslide);
          }
      }
      
    } else{
      //Sinon, si on est connecté avec le serveur
      if (currentslide === 0) {
          return false;
      }
      else {
            sendSlide = currentslide -1;
  var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', './remote/changestate.php?set=' + sendSlide, true);
        httpRequest.send();
    }
    }
}
// a faire: auatomatiser le goto();

var goto = function (num) {
  if(remotestate === 0) {
    if (num == currentslide) {
        return false;
    }
    else {
        allpoints[currentslide].classList.remove('select');
        var start = currentslide;
        if ((start - num) < 0) {
            for (var j = 0; j < (num - start); j++) {
                nextslide();
            }
        }
        else if ((currentslide - num) > 0) {
            for (var j = 0; j < (start - num); j++) {
                prevslide();
            }
        }
        allpoints[currentslide].classList.add('select');    
    }
}
  else {
    sendSlide = num;
    
    
  var httpRequest = new XMLHttpRequest();
        httpRequest.open('GET', './remote/changestate.php?set=' + sendSlide, true);
        httpRequest.send();
        }
    
  }

var remoteGoto = function (num) {
    if (num == currentslide) {
        return false;
    }
    else {
        allpoints[currentslide].classList.remove('select');
        var start = currentslide;
        if ((start - num) < 0) {
            for (var j = 0; j < (num - start); j++) {
  
    if (remotestate === 0) {}
      if(currentslide == allslides.length-1) { //évite de chercher à dépasser le nombre de slides
          return false;
      }
      else {
          allslides[currentslide].classList.add('prev');
          allslides[currentslide].classList.remove('current');
          allslides[currentslide + 1].classList.add('current');
          currentslide++; 

          var content = allslides[currentslide].querySelectorAll('.animate');
          for (var i = 0; i < content.length; i++) {
              content[i].classList.add('current');
          }
          for (var i = 0 ; i < allindependent.length; i++) {
              allindependent[i].classList.remove('slide' + (currentslide -1));
              allindependent[i].classList.add('slide' + currentslide);
          }

          content = allslides[currentslide -1 ].querySelectorAll('.animate');
          for (var i = 0; i < content.length; i++) {
              content[i].classList.remove('current');
          }
      }
 
            }
        }
        else if ((currentslide - num) > 0) {
            for (var j = 0; j < (start - num); j++) {
      if (currentslide === 0) {
          return false;
      }
      else {
          allslides[currentslide - 1].classList.remove('prev');
          allslides[currentslide - 1].classList.add('current');
          allslides[currentslide].classList.remove('current');


          currentslide--;

          var content = allslides[currentslide].querySelectorAll('.animate');
          for (var i = 0; i < content.length; i++) {
              content[i].classList.add('current');
          }

          content = allslides[currentslide +1 ].querySelectorAll('.animate');
          for (var i = 0; i < content.length; i++) {
              content[i].classList.remove('current');
          }

          for (var i = 0 ; i < allindependent.length; i++) {
              allindependent[i].classList.remove('slide' + (currentslide +1));
              allindependent[i].classList.add('slide' + currentslide);
          }
      }
            }
        }
        allpoints[currentslide].classList.add('select');    
    }
}

