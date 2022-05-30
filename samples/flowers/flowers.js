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
        'blue-1-4',
        'green-1-4',
        'orange-1-4',
        'yellow-1-4',
        'yellow-2-4',
        'green-2-4',
        'blue-2-4',
        'pink-1-4',
        'pink-2-4',
        'yellow-3-4',
        'orange-2-4',
        'green-3-4',
        'yellow-4-4',
        'yellow-5-4',
        'pink-3-4',
      ],
      { rotate: this.petalOut }
    )

    this.fsiLayersEl.setProperties(
      [
        'blue-1-3',
        'green-1-3',
        'orange-1-3',
        'yellow-1-3',
        'yellow-2-3',
        'green-2-3',
        'blue-2-3',
        'pink-1-3',
        'pink-2-3',
        'yellow-3-3',
        'orange-2-3',
        'green-3-3',
        'yellow-4-3',
        'yellow-5-3',
        'pink-3-3',
      ],
      { rotate: -this.petalMid }
    )

    this.fsiLayersEl.setProperties(
      [
        'blue-1-2',
        'green-1-2',
        'orange-1-2',
        'yellow-1-2',
        'yellow-2-2',
        'green-2-2',
        'blue-2-2',
        'pink-1-2',
        'pink-2-2',
        'yellow-3-2',
        'orange-2-2',
        'green-3-2',
        'yellow-4-2',
        'yellow-5-2',
        'pink-3-2',
      ],
      { rotate: this.petalIn }
    )

    this.fsiLayersEl.render()

    this.thenTime = nowTime
  }
}
