class Generate {
    static generatePoints () {
        let text = '<div onclick="goto(0);" class="point select"></div>'
        for (let i = 1; i < allslides.length; i++) {
            text += '<div onclick="goto(' + i + ');" class="point"></div>'
        }
        document.querySelector('#points').innerHTML = text;
        allpoints = document.querySelectorAll('.point');
        timeOut1 = window.setTimeout(hideInterface, 2000);
    }
}