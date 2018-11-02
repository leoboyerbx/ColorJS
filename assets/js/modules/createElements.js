import qS from "./querySelector";

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


        resolve()
    })
}