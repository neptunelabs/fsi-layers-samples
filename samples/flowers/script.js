function runAnimation() {
  new Animation()
}

class Animation {
  constructor() {
    this.thenTime = Date.now()
    this.petalOut = 0
    this.petalMid = 0
    this.petalIn = 0
    this.fsiLayersEl = document.getElementById('flowerGarden')
    this.moveLayers()
  }

  moveLayers() {

    this.rafCallID = requestAnimationFrame(() => this.moveLayers())

    let nowTime = Date.now()
    let elapsedTime = nowTime - this.thenTime

    this.petalOut += elapsedTime / 240.0
    this.petalMid += elapsedTime / 80.0
    this.petalIn += elapsedTime / 120.0

    this.fsiLayersEl.setProperties(
      [
        'pink-1-4',
        'gerbera-1-4',
        'sunflower-1-4',
        'sunflowero-1-4',
        'cosmea-1-4',
        'sunflowero-2-4',
        'pink-2-4',
        'sunflower-2-4',
        'dahlia-1-4',
        'cosmea-1-4',
        'pink-4-4',
        'gerbera-2-4',
        'pink-3-4',
        'gerbera-3-4',
        'dahlia-2-4',
        'cosmea-2-4',
      ],
      { rotate: this.petalOut }
    )

    this.fsiLayersEl.setProperties(
      [
        'pink-1-3',
        'gerbera-1-3',
        'sunflower-1-3',
        'sunflower-2-3',
        'sunflowero-1-3',
        'cosmea-1-3',
        'sunflowero-2-3',
        'pink-2-3',
        'dahlia-1-3',
        'cosmea-1-3',
        'pink-3-3',
        'gerbera-2-3',
        'pink-4-3',
        'gerbera-3-3',
        'dahlia-2-3',
        'cosmea-2-3',
      ],
      { rotate: -this.petalMid }
    )

    this.fsiLayersEl.setProperties(
      [
        'pink-1-2',
        'gerbera-1-2',
        'sunflower-1-2',
        'sunflower-2-2',
        'sunflowero-1-2',
        'cosmea-1-2',
        'sunflowero-2-2',
        'pink-2-2',
        'dahlia-1-2',
        'cosmea-1-2',
        'pink-3-2',
        'gerbera-2-2',
        'pink-4-2',
        'gerbera-3-2',
        'dahlia-2-2',
        'cosmea-2-2',
      ],
      { rotate: this.petalIn }
    )

    this.fsiLayersEl.render()

    this.thenTime = nowTime
  }
}
