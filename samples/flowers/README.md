# Flowers - FSI Layers Rotation Example

This readme describes how the rotating flowers example is achieved with *FSI Layers*.
The aim of the demo is to show how individual layers of a group can be addressed and animated.

Add FSI Layers to your site:

```xml
 <fsi-layers id="flowerGarden" useDevicePixelRatio="true" onReady="runAnimation" width="100%" height="100%">
</fsi-layers>
```

# Adding groups and layers

First, an overall layer is set with a reference width and height:
```xml
<fsi-layer-group name="container" right="centered" bottom="centered" width="100%" height="100%" refMode="fill" refWidth="1920" refHeight="880">
</fsi-layer-group>
```

Each flower is a single group containing three layers.
Each group has a different size and placement in the main div for variety.
The template ``{{{sources.images}}}`` in the src attribute is replaced by Grunt with the variables written in the .env project file.
These groups are added to the first fsi-layer-group. The rpx value defines that the sizes will be oriented to the refWidth="1920" refHeight="880" set in the overall group.

Example small flower:
```xml
<fsi-layer-group name="pink-1" width="222 rpx" height="222 rpx" right="-180 rpx" top="280 rpx">
  <fsi-layer name="pink-1-4" width="120%" height="120%" rotateCenter="center center" src="{{{sources.images}}}/flower/photos/pink.png"></fsi-layer>
  <fsi-layer name="pink-1-3" width="90%" height="90%" rotateCenter="center center" src="{{{sources.images}}}/flower/photos/pink.png" ></fsi-layer>
  <fsi-layer name="pink-1-2" width="70%" height="70%" rotateCenter="center center" src="{{{sources.images}}}/flower/photos/pink.png" ></fsi-layer>
</fsi-layer-group>
```

Example big flower:
```xml
        <fsi-layer-group name="sunflower-2" width="600 rpx" height="600 rpx" top="250 rpx" left="200 rpx">
  <fsi-layer name="sunflower-2-4" width="120%" height="120%" rotateCenter="center center" rotate="-5" src="{{{sources.images}}}/flower/photos/sunflower.png" ></fsi-layer>
  <fsi-layer name="sunflower-2-3" width="100%" height="100%" rotateCenter="center center" src="{{{sources.images}}}/flower/photos/sunflower.png" ></fsi-layer>
  <fsi-layer name="sunflower-2-2" width="90%" height="90%" rotateCenter="center center" src="{{{sources.images}}}/flower/photos/sunflower.png" ></fsi-layer>
</fsi-layer-group>
```

## Movement

The embedded **script.js** script handles the animation.

First the fsi-layers instance is returned with *getElementById*.

```javascript
this.fsiLayersEl = document.getElementById('flowerGarden')
```

The moveLayers function calls the FSI layer method *setProperties* ([see the manual for more information](https://docs.neptunelabs.com/fsi-viewer/latest/fsi-layers/javascript-interface)).

The last layer (the dot in the middle) is never moved, while the other layers are animated with the parameter
*rotate* ([all available parameters for FSI Layers](https://docs.neptunelabs.com/fsi-viewer/latest/fsi-layers/parameters)).

The animation speed and rotation direction are different for each layer in a group to create a more interesting movement.

```javascript
this.petalOut += elapsedTime / 240.0
this.petalMid += elapsedTime / 80.0
this.petalIn += elapsedTime / 120.0
```

This is how one set of layers (of each flower) receives the properties:

```javascript
 ...
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
```
After setting properties to all layers, *render* renders the current state of FSI Layers. It's important to only call this after changing properties.

```javascript
this.fsiLayersEl.render()
```

## Testing with examples from  your own server

To test the examples with images from your own [FSI Server](https://www.neptunelabs.com/fsi-server/), please first copy the env.yml.dist file to env.yml and adapt the file, then restart the main demo again.
