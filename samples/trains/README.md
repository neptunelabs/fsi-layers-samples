# Trains - FSI Layers Animation Example

This demo shows a simple animaton example based on *FSI Layers*.

### Description

The animation is dealt with in the trains.js:
This is initialized by *FSI-Layers* with the callback ``onReady``.

```javascript
function runTrains() {
  new TrainsRunning();
}
```
```xml
<fsi-layers
  id="myTestLayers"
  useDevicePixelRatio="true"
  debug="1"
  onReady="runTrains"
>
</fsi-layers>
```

First, an overall layer with a reference width & height is set and the layers underneath - except the background - reference this with using rpx as value in the dimensions:
```xml
<fsi-layer-group name="container" right="centered" bottom="centered" width="100%" height="100%" refMode="fill" refWidth="3268" refHeight="1530">
  <fsi-layer
    name="background"
    src="{{{sources.images}}}/landscape/background.png"
    width="100%"
    height="100%"
    left="0" top="0"
  ></fsi-layer>

  <fsi-layer-group name="clouds">
    <fsi-layer
      name="cloud-back"
      width="2189 rpx"
      height="600 rpx"
      top="0 rpx"
      opacity="0.5"
      hidden="0"
      src="{{{sources.images}}}/landscape/clouds-back.png"
    ></fsi-layer>

    <fsi-layer
      name="cloud-front"
      width="2816 rpx"
      height="600 rpx"
      top="0 rpx"
      hidden="0"
      src="{{{sources.images}}}/landscape/clouds-front.png"
    ></fsi-layer>
  </fsi-layer-group>
</fsi-layer-group>
```
The template ``{{{sources.images}}}`` in the src attribute is replaced by Grunt by the variables written in the project/env.yml project file.

## Movement

The base parameters are set which are used for the animation.
Then the fsi-layers instance is returned with *getElementsByTagName*.
```javascript
class TrainsRunning {
  rafCallID;
  layers;

  rMill = 1;

  xTrain = 0;
  xCloudFront = 0;
  xCloudBack = 0;
  xWater = 0;

  dirTrain = 0.2;
  dirCloudFront = 0.01;
  dirCloudBack = 0.003;
  dirWater = 0.005;

  constructor() {
    this.layers = document.getElementsByTagName("fsi-layers")[0];
    this.moveLayers();
  }

  ...
```

By using the function moveLayers the FSI Layer method *setProperties* ([see manual for more information](https://docs.neptunelabs.com/fsi-viewer/latest/fsi-layers/javascript-interface)) is called.

With the parameters *rotate*, *left*, *right* & *bottom* the layers are animated ([all available parameters for FSI Layers](https://docs.neptunelabs.com/fsi-viewer/latest/fsi-layers/parameters)).

Afterwards, *render* renders the current state of FSI Layers. It's important to only call this after changing properties.
```javascript
moveLayers() {
  this.layers.setProperties(["windmill-blades"], { rotate: this.rMill++ });
  this.layers.setProperties(["train"], {
    right: this.xTrain + "%",
    bottom: this.xTrain + "%",
  });
  this.layers.setProperties(["cloud-front"], {
    left: this.xCloudFront + "%",
  });
  this.layers.setProperties(["cloud-back"], { left: this.xCloudBack + "%" });
  this.layers.setProperties(["water"], { right: this.xWater + "%" });

  this.xTrain += this.dirTrain;
  this.xCloudFront += this.dirCloudFront;
  this.xCloudBack += this.dirCloudBack;
  this.xWater += this.dirWater;

  if (this.xTrain > 100) {
    this.layers.setProperties(["train"], {
      flip: "horizontal",
      effects: "channelLevelTrunk(all,0,147,255),colorize(27,100,0)",
    });
    this.dirTrain = -this.dirTrain;
  }

  if (this.xTrain < -35) {
    this.layers.setProperties(["train"], { flip: "none", effects: "none" });
    this.dirTrain = -this.dirTrain;
  }

  if (this.xWater > 1 || this.xWater < 0) {
    this.dirWater = -this.dirWater;
  }
  this.layers.render();
  this.rafCallID = requestAnimationFrame(() => this.moveLayers());
}
```


### Testing with images from  your own server

To test the examples with images from your own [FSI Server](https://www.neptunelabs.com/fsi-server/), please first copy the env.yml.dist file to env.yml and adapt the file, then restart the main demo again.
