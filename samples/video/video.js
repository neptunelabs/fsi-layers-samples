function runTrains() {
  new TrainsRunning()
}

class TrainsRunning {

  constructor() {

    this.thenTime = Date.now()

    this.rMill = 1

    this.xTrain = -35
    this.xCloudFront = 0
    this.xCloudBack = -30
    this.xWater = 0

    this.dirTrain = 1
    this.dirCloudFront = 1
    this.dirCloudBack = 1

    this.speedTrain = 100
    this.speedCloudFront = 1000
    this.speedCloudBack = 1800
    this.speedWater = 2000
    this.speedMill = 50

    this.fsiLayersEl = document.getElementById('trainsFSILayer')

    this.moveLayers()
  }

  moveLayers() {

    this.rafCallID = requestAnimationFrame(() => this.moveLayers())

    let nowTime = Date.now()
    let elapsedTime = nowTime - this.thenTime

    this.fsiLayersEl.setProperties(['windmill-blades'], { rotate: this.rMill += elapsedTime / this.speedMill })
    this.fsiLayersEl.setProperties(['train'], {
      right: this.xTrain + '%',
      bottom: this.xTrain + '%',
    })
    this.fsiLayersEl.setProperties(['cloud-front'], { left: this.xCloudFront + '%' })
    this.fsiLayersEl.setProperties(['cloud-back'], { left: this.xCloudBack + '%' })
    this.fsiLayersEl.setProperties(['water'], { right: this.xWater + '%' })

    this.xTrain += this.dirTrain * (elapsedTime / this.speedTrain)
    this.xCloudFront += elapsedTime / this.speedCloudFront
    this.xCloudBack += elapsedTime / this.speedCloudBack
    this.xWater = (Math.sin(nowTime / this.speedWater))

    if (this.xTrain > 100) {
      this.fsiLayersEl.setProperties(['train'], {
        flip: 'horizontal',
        effects: 'channelLevelTrunk(all,0,147,255),colorize(27,100,0)',
      })
      this.dirTrain = -1
    } else if (this.xTrain < -35) {
      this.fsiLayersEl.setProperties(['train'], { flip: 'none', effects: 'none' })
      this.dirTrain = 1
    }

    if (this.xCloudFront > 100) {
      this.xCloudFront = -100
    }

    if (this.xCloudBack > 100) {
      this.xCloudBack = -100
    }

    this.fsiLayersEl.render()

    this.thenTime = nowTime
  }
}
