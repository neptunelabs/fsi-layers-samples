function runAnimation() {
  new Animation()
}

class Animation {
  constructor() {
    this.degree = 0
    this.fsiLayersEl = document.getElementById('flowerGarden')
    this.moveLayers()
  }

  moveLayers() {
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
      { rotate: this.degree++ / 24 }
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
      { rotate: -this.degree++ / 8 }
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
      { rotate: this.degree++ / 12 }
    )

    this.fsiLayersEl.render()

    this.rafCallID = requestAnimationFrame(() => this.moveLayers())
  }
}
