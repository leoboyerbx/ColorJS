import qS from "./querySelector";

let parseDataSlideshow = function(dataString) {
    let parser = new DOMParser()
    let content = parser.parseFromString(dataString, "text/html")
    let slides = content.querySelector('slider')
    if (slides) {
       return slides.innerHTML
   } else {
       return null
   }
}

export default function () {
    Node.prototype.insertAfter = function (newNode, referenceNode) {
        this.insertBefore(newNode, referenceNode.nextSibling)
    }
    return new Promise ((resolve, reject) => {
        let body = document.body
        let slider = qS('#cjs-slider')
        //-- Thumbnails for global view
        let globalView = document.createElement('div')
        globalView.id = "globalview"
        globalView.innerHTML = `<header class="cjs-header">${document.title}</header>
        <div class="independent"></div>
        <div id="cjs-thumbnails-list">
        </div>`
        body.prepend(globalView)

        //-- Points on the left
        let points = document.createElement('div')
        points.id = "cjs-points"
        body.insertAfter(points, slider)

        //-- interface
        let ui = document.createElement('div')
        ui.classList.add('material')
        ui.id = "cjs-interface"
        ui.innerHTML = `<span class="fa fa-th" onclick="window.slideShow.globalView();"></span>
        <span id="cjs-control">
         <span class="fa fa-fast-backward" onclick="window.slideShow.goto(0);"></span>
        <span class="fa fa-caret-left" onclick="window.slideShow.prev()"></span>
        <span class="fa fa-caret-right" onclick="window.slideShow.next()"></span>
        <span class="fa fa-fast-forward" onclick="window.slideShow.goto(window.slideShow.allSlides.length - 1)"></span>
        <span class="fa fa-print" onclick="window.slideShow.print()"></span>
       </span>`
       body.insertAfter(ui, points)

        let fileInput = qS('#cjs-file-input')
        if (fileInput) {
            fileInput.addEventListener('change', e => {
                let file = e.target.files[0]
                if (!file) {
                    reject("No file specified")
                } else {
                    let reader = new FileReader()
                    reader.addEventListener('load', e => {
                        let parsedSlides = parseDataSlideshow(e.target.result)
                        if (parsedSlides) {
                            slider.innerHTML = parsedSlides
                            resolve()
                        }
    
                    })
                    reader.readAsText(file)
                }
            })
        } else {
            resolve()
        }
    })
}