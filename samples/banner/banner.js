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

    this.fsiLayersEl.render()

    this.thenTime = nowTime
  }
}
