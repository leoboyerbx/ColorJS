class Remote {
    static init(slideShow) {
        slideShow.remote = {
            start : function () {
                console.log(slideShow)
                slideShow.remoteState = 1;
                let httpRequest = new XMLHttpRequest();
                let back;
            
                httpRequest.onreadystatechange = function () {
                    if (httpRequest.readyState === 4) {
                        back = httpRequest.responseText;
            
                        if (back != slideShow.currentAnimate) {
                            slideShow.gotoAnimate(back);
                        }
            
                        slideShow.timeOut2 = window.setTimeout(this.start, 200);
                    }
                }
                httpRequest.open('GET', './remote/givestate.php', true);
                httpRequest.send();
            
                document.querySelector('#remote').classList.remove('fa-wifi');
                document.querySelector('#remote').classList.add('fa-lock');
            },
            stop : function () {
                slideShow.remoteState = 0;
                window.clearTimeout(slideShow.timeOut2);
                document.querySelector('#remote').classList.remove('fa-lock');
                document.querySelector('#remote').classList.add('fa-wifi');
            },
            toggle : function() {
                if (slideShow.remoteState == 1) {
                    this.stop();
                } else {
                    this.start();
                }
            }
        }
    }
}


export default Remote