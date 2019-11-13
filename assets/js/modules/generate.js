const generatePoints = function (slideShow) {
  let text = '<div onclick="window.slideShow.goto(0);" class="cjs-point select"></div>'
  for (let i = 1; i < slideShow.allSlides.length; i++) {
    text += '<div onclick="window.slideShow.goto(' + i + ');" class="cjs-point"></div>'
  }
  document.querySelector('#cjs-points').innerHTML = text
  slideShow.allPoints = document.querySelectorAll('.cjs-point')
  slideShow.timeOut1 = window.setTimeout(slideShow.hideInterface, 2000)
}
const generateThumbnails = function (slideShow) {
  let thumbnails = ''
  let color
  let legend
  let image
  for (let i = 0; i < slideShow.allSlides.length; i++) {
    color = slideShow.allSlides[i].style.backgroundColor
    if (slideShow.allSlides[i].querySelector('h1')) {
      legend = slideShow.allSlides[i].querySelector('h1').innerHTML
    } else {
      legend = 'Slide ' + i
    }
    const getImage = slideShow.allSlides[i].querySelector('img')

    if (getImage) {
      image = getImage.src
      image = '<img src="' + image + '" class="cjs-thumbnail-image">'
    } else {
      image = ''
    }

    thumbnails += '<div class="cjs-thumbnail" onclick="window.slideShow.globalView(); window.slideShow.goto(' + i + ');"><div class="cjs-thumbnail-picture" style="background-color: ' + color + ';">' + image + ' </div><div class="cjs-legend">' + legend + '</div></div>'
  }
  document.querySelector('#cjs-thumbnails-list').innerHTML = thumbnails
}

const generateAnimData = function (slideShow) {
  let increment = 0
  for (let i = 0; i < slideShow.allSlides.length; i++) {
    slideShow.allSlides[i].setAttribute('anim-data', increment)
    const animeElementsInSlide = slideShow.allSlides[i].querySelectorAll('[cjs-animate]')
    let lastestAnimation = 0
    for (let j = 0; j < animeElementsInSlide.length; j++) {
      const element = animeElementsInSlide[j]
      const elementAnim = Number(element.getAttribute('cjs-animate'))
      element.setAttribute('anim-data', increment + elementAnim)
      if (elementAnim > lastestAnimation) {
        lastestAnimation = elementAnim
      }
    }

    increment += lastestAnimation + 1
  }

  document.querySelectorAll('[anim-data="0"]').forEach(function (el) { el.classList.add('current') })
  slideShow.allAnimate = document.querySelectorAll('[anim-data]')
}

const addToPrevSlide = function (slideShow, i, transition) {
  if (i > 0) {
    slideShow.allSlides[i - 1].classList.add(transition)
  }
}
const generateTranstions = function (slideShow) {
  for (let i = 0; i < slideShow.allSlides.length; i++) {
    const slide = slideShow.allSlides[i]
    const cL = Array.from(slide.classList)
    if (cL.includes('bottom')) {
      slide.classList.add('ibottom')
      if (cL.includes('cover')) {
        addToPrevSlide(slideShow, i, 'ostay')
      } else if (cL.includes('push')) {
        addToPrevSlide(slideShow, i, 'opushtop')
      } else {
        addToPrevSlide(slideShow, i, 'otop')
      }

      slide.classList.remove('bottom')
    } else if (cL.includes('right')) {
      slide.classList.add('iright')
      if (cL.includes('cover')) {
        addToPrevSlide(slideShow, i, 'ostay')
      } else if (cL.includes('push')) {
        addToPrevSlide(slideShow, i, 'opushleft')
      } else {
        addToPrevSlide(slideShow, i, 'oleft')
      }

      slide.classList.remove('right')
    } else if (cL.includes('top')) {
      slide.classList.add('itop')
      if (cL.includes('cover')) {
        addToPrevSlide(slideShow, i, 'ostay')
      } else if (cL.includes('push')) {
        addToPrevSlide(slideShow, i, 'opushbottom')
      } else {
        addToPrevSlide(slideShow, i, 'obottom')
      }

      slide.classList.remove('top')
    } else if (cL.includes('left')) {
      slide.classList.add('ileft')
      if (cL.includes('cover')) {
        addToPrevSlide(slideShow, i, 'ostay')
      } else if (cL.includes('push')) {
        addToPrevSlide(slideShow, i, 'opushright')
      } else {
        addToPrevSlide(slideShow, i, 'oright')
      }

      slide.classList.remove('left')
    } else if (cL.includes('fade')) {
      slide.classList.add('ifade')
      addToPrevSlide(slideShow, i, 'ostay')

      slide.classList.remove('fade')
    } else { // Default transition: pop
      slide.classList.add('idefault')
      addToPrevSlide(slideShow, i, 'ostay')
    }
  }
}

const generateMask = function (slideShow) {
  // -- mask
  const maskModel = slideShow.slider.querySelector('.cjs-mask')
  if (maskModel && !maskModel.classList.contains('fixed')) {
    let currentPart = 'Part Title'
    const currentDate = new Date()
    slideShow.allSlides.forEach((slide, index) => {
      if (!slide.classList.contains('no-mask')) {
        const localMask = maskModel.cloneNode(true)
        localMask.classList.add('generated')

        localMask.innerHTML = localMask.innerHTML.replace(/\${pageNbr}/g, index + 1)

        const newPart = slide.getAttribute('cjs-part-title')
        if (newPart) {
          currentPart = newPart
        }
        localMask.innerHTML = localMask.innerHTML.replace(/\${partTitle}/g, currentPart)
        localMask.innerHTML = localMask.innerHTML.replace(/\${date}/g, currentDate.toLocaleDateString())
        localMask.innerHTML = localMask.innerHTML.replace(/\${fullFRDate}/g, currentDate.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
        localMask.innerHTML = localMask.innerHTML.replace(/\${fullENDate}/g, currentDate.toLocaleDateString('en-UK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))

        slide.insertBefore(localMask, slide.firstChild)
      }
    })
  }
}

class Generate {
  /**
     * Fonction qui g&nère les points, les thumbnails et les AnimData
     * @param {Object} slideShow Objet
     */
  static generate (slideShow) {
    generatePoints(slideShow)
    generateThumbnails(slideShow)
    generateTranstions(slideShow)
    generateAnimData(slideShow)
    generateMask(slideShow)
  }

  /**
     * Fonction qui ajoute à l'objet slideShow les méthodes sans catégorie
     * @param {Object} slideShow Objet
     */
  static global (slideShow) {
    slideShow.print = function () {
      this.goto(0)
      document.querySelectorAll('[animate]').forEach(function (e) {
        e.classList.add('notransition')
        e.classList.add('current')
      })

      window.print()
    }
    slideShow.setPoint = function (value) {
      this.allPoints.forEach(function (e) {
        e.classList.remove('select')
      })
      this.allPoints[value].classList.add('select')
    }
  }
}

export default Generate
