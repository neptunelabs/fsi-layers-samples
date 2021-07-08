function runTrains() {
  new TrainsRunning()
}

class TrainsRunning {
  constructor() {
    this.rMill = 1

    this.xTrain = 0
    this.xCloudFront = 0
    this.xCloudBack = 0
    this.xWater = 0

    this.dirTrain = 0.2
    this.dirCloudFront = 0.01
    this.dirCloudBack = 0.003
    this.dirWater = 0.005

    this.fsiLayersEl = document.getElementById('trainsFSILayer')
    this.moveLayers()
  }

  moveLayers() {
    this.fsiLayersEl.setProperties(['windmill-blades'], { rotate: this.rMill++ })
    this.fsiLayersEl.setProperties(['train'], {
      right: this.xTrain + '%',
      bottom: this.xTrain + '%',
    })
    this.fsiLayersEl.setProperties(['cloud-front'], {
      left: this.xCloudFront + '%',
    })
    this.fsiLayersEl.setProperties(['cloud-back'], { left: this.xCloudBack + '%' })
    this.fsiLayersEl.setProperties(['water'], { right: this.xWater + '%' })

    this.xTrain += this.dirTrain
    this.xCloudFront += this.dirCloudFront
    this.xCloudBack += this.dirCloudBack
    this.xWater += this.dirWater

    if (this.xTrain > 100) {
      this.fsiLayersEl.setProperties(['train'], {
        flip: 'horizontal',
        effects: 'channelLevelTrunk(all,0,147,255),colorize(27,100,0)',
      })
      this.dirTrain = -this.dirTrain
    }

    if (this.xTrain < -35) {
      this.fsiLayersEl.setProperties(['train'], { flip: 'none', effects: 'none' })
      this.dirTrain = -this.dirTrain
    }

    if (this.xWater > 1 || this.xWater < 0) {
      this.dirWater = -this.dirWater
    }
    this.fsiLayersEl.render()
    this.rafCallID = requestAnimationFrame(() => this.moveLayers())
  }
}
