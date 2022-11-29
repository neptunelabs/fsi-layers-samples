function animateBanner() {
  new BannerAnimation()
}

class BannerAnimation {

  constructor() {

    this.thenTime = Date.now()

    this.xSale = -500
    this.ySale = -100
    this.dirSale = 6
    this.speedSale = 15

    this.textOpacity = 0
    this.dirOp = 0.2
    this.speedText = 300
    this.currentImage = 0
    this.images = [
       "{{{sources.images}}}/banner/furniture-banner-5.png",
       "{{{sources.images}}}/banner/furniture-banner-1.png",
       "{{{sources.images}}}/banner/furniture-banner-2.png",
       "{{{sources.images}}}/banner/furniture-banner-3.png"
     ]

    this.fsiLayersEl = document.getElementById('bannerFSILayer')

    this.moveLayers()

  }

  moveLayers() {

    this.rafCallID = requestAnimationFrame(() => this.moveLayers())

    let nowTime = Date.now()
    let elapsedTime = nowTime - this.thenTime

    this.fsiLayersEl.setProperties(['sale'], {
      bottom: this.xSale,
      left: this.ySale,
    })

    this.fsiLayersEl.setProperties(['sale-70'], {
      opacity: this.textOpacity,
    })

    this.fsiLayersEl.setProperties(['sale-70'], {
      opacity: this.textOpacity,
    })

    this.textOpacity += this.dirOp * (elapsedTime / this.speedText)

    this.xSale += this.dirSale * (elapsedTime / this.speedSale)

    if (this.xSale > -200) {
      this.speedSale = 0
      this.fsiLayersEl.setProperties(['sale'], {
        bottom: -200,
        left: -100,
      })
    }
    if (this.textOpacity > 1) {
      this.dirOp = -0.1
    }
    if (this.textOpacity < 0.1) {
      this.dirOp = 0.1
    }

    setTimeout(() => {
      switchImage }, 1000);

    function switchImage () {
      if (this.currentImage < this.images.length - 1) {
        console.log("jo", this.images[this.currentImage], this.images.length, this.currentImage)
        this.currentImage = this.currentImage + 1
      } else {
        console.log("no", this.currentImage, this.images.length, this.currentImage)
        this.currentImage = 0
      }
    }

    this.fsiLayersEl.setProperties(['furniture'], {
      src: this.images[this.currentImage],
    })

    console.log ("test", this.images[this.currentImage], this.images.length, this.currentImage)

    this.fsiLayersEl.render()

    this.thenTime = nowTime
  }
}
