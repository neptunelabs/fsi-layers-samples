# Flowers - FSI Layers Rotation Example

This readme describes how the rotating flowers sample with *FSI Layers* is achieved.
The aim of the demo is to show how single layers of a group can be addressed and animated.

# Adding groups and layers

First, an overall layer with a reference width & height is set:
```xml
<fsi-layer-group name="container" right="centered" bottom="centered" width="100%" height="100%" refMode="fill" refWidth="1920" refHeight="880">
</fsi-layer-group>
```

Each flower is a single group which contains four layers.
Each group has a different size and placement in the main div in order to add variety.
The template ``{{{sources.images}}}`` in the src attribute is replaced by Grunt by the variables written in the .env project file.
Those groups are added to the first fsi-layer-group. The rpx value defines that the sizes will be oriented on the refWidth="1920" refHeight="880" set in the overall group.
Example small flower:
```xml
<fsi-layer-group name="blue-1" width="222 rpx" height="222 rpx" right="-180 rpx" top="280 rpx">
  <fsi-layer name="blue-1-4" width="120%" height="120%" rotateCenter="center center" src="{{{sources.images}}}/flower/3-blue.png"></fsi-layer>
  <fsi-layer name="blue-1-3" width="90%" height="90%" rotateCenter="center center" src="{{{sources.images}}}/flower/3-green.png" ></fsi-layer>
  <fsi-layer name="blue-1-2" width="70%" height="70%" rotateCenter="center center" src="{{{sources.images}}}/flower/2-yellow.png" ></fsi-layer>
  <fsi-layer name="blue-1-1" width="38%" height="38%" rotateCenter="center center" hidden="0" src="{{{sources.images}}}/flower/1-orange.png" ></fsi-layer>
</fsi-layer-group>
```

Example big flower:
```xml
<fsi-layer-group name="orange-1" width="600 rpx" height="600 rpx" top="250 rpx" left="200 rpx">
  <fsi-layer name="orange-1-4" width="120%" height="120%" rotateCenter="center center" rotate="-5" src="{{{sources.images}}}/flower/3-orange.png" ></fsi-layer>
  <fsi-layer name="orange-1-3" width="90%" height="90%" rotateCenter="center center" src="{{{sources.images}}}/flower/3-blue.png" ></fsi-layer>
  <fsi-layer name="orange-1-2" width="70%" height="70%" rotateCenter="center center" src="{{{sources.images}}}/flower/2-green.png" ></fsi-layer>
  <fsi-layer name="orange-1-1" width="38%" height="38%" rotateCenter="center center" src="{{{sources.images}}}/flower/1-yellow.png" ></fsi-layer>
</fsi-layer-group>
```

## Movement

The **flowers.js** script embedded deals with the animation:
```html
<script src="flowers.js"></script>
```

First the fsi-layers instance is returned with *getElementsByTagName*.
By using the function moveLayers the FSI Layer method *setProperties* ([see manual for more information](https://docs.neptunelabs.com/fsi-viewer/latest/fsi-layers/javascript-interface)) is called.

The last layer (the dot in the middle) is never moved, while the other layers are animated with the parameter
*rotate* ([all available parameters for FSI Layers](https://docs.neptunelabs.com/fsi-viewer/latest/fsi-layers/parameters)).

The animation speed and rotation direction differs for each layer in a group in order to create a more interesting movement.

Afterwards, *render* renders the current state of FSI Layers. It's important to only call this after changing properties.
```javascript
class Animation {

 ...

  moveLayers() {
    this.layers.setProperties(["blue-1-4","orange-1-4"], {rotate: this.degree++/24});
    this.layers.setProperties(["blue1-3","orange-1-3"], {rotate: -this.degree++/8});
    this.layers.setProperties(["blue-1-2", "orange-1-2"], {rotate: this.degree++/12});
    this.layers.render();
    this.rafCallID = requestAnimationFrame(() => this.moveLayers());
   }
}
```

The animation function is called in onReady from a callback defined in fsi-layer tag:

```javascript
function runAnimation(){
  new Animation();
}
```

## Testing with examples from  your own server

To test the examples with images from your own [FSI Server](https://www.neptunelabs.com/fsi-server/), please first copy the env.yml.dist file to env.yml and adapt the file, then restart the main demo again.
