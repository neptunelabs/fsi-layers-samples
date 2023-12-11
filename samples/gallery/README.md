Creating an image gallery

In this example, FSI Layers is not defined as an HTML tag, but generated entirely by JavaScript and used to show a gallery where you can switch
the artworks in between the frames.

FSI Layers contains an extensive JS API with methods and callbacks that you can use.
You can find [an overview of all available parameters in the corresponding documentation](https://docs.neptunelabs.com/docs/fsi-layers/js-api/public-methods).

This example is a simple demonstration of how to use these methods and callbacks.

To display the gallery with FSI Layers, all you need to do is add the following script to the top of your web page:

```html
<script
  src='https://fsi.domain.tld/fsi/viewer/applications/layers/js/fsilayers.js'
</script>
```

This will ensure that the FSI Layers is loaded.

Usually, you would put the `<fsi-layers>` tag in the HTML code where you would like to display it.
Since we will load everything dynamically via JS this time, the HTML code will look like this:

```html
<div class="container">
  <div class="row p-3 layersContainer">
   <div class="myLayers mx-auto" id="layersEle">
        </div>
    </div>
</div>
```

`layersEle` is where the Layers instance will be embedded.

Everything else is achieved via JS in the corresponding `script.js`. For better overview, we will list it here separated in a few parts.

```js
const backgroundImage = 'images/samples/layers/gallery/image-wall.png'

const imageList = [
'images/samples/layers/gallery/art-0.png',
'images/samples/layers/gallery/art-2.png',
'images/samples/layers/gallery/art-3.png',
'images/samples/layers/gallery/art-4.png',
'images/samples/layers/gallery/art-5.png',
'images/samples/layers/gallery/art-6.png',
'images/samples/layers/gallery/art-7.png',
'images/samples/layers/gallery/art-8.png',
'images/samples/layers/gallery/art-1.png',
'images/samples/layers/gallery/art-9.png',
'images/samples/layers/gallery/art-10.png',
'images/samples/layers/gallery/art-11.png',
'images/samples/layers/gallery/art-12.png',
]
```

First, we determine the background image as well as the image list of the artworks that we can cycle through.

```js
const pictures = [
{
number: 0,
offsetShift: 202,
image: {
src: imageList[0],
left: '21.8%',
bottom: '59.5%',
width: '24%',
height: '24%',
},
glass: {
src: 'images/samples/layers/gallery/glass-top-1.png',
left: '22.276%',
top: '16.785%',
width: '11.75%',
},
button: {
left: '27.5%',
bottom: '34%',
width: '23%',
height: '23%',
},
},
{
number: 3,
offsetShift: 258,
image: {
src: imageList[3],
right: '39.7%',
bottom: '49.2%',
width: '31%',
height: '31%',
},
glass: {
src: 'images/samples/layers/gallery/glass-top-2.png',
left: '41.92%',
top: '13.95%',
width: '20.31%',
},
button: {
right: '25%',
bottom: '18%',
width: '23%',
height: '23%',
},
},
{
number: 4,
offsetShift: 202,
image: {
src: imageList[4],
right: '18.4%',
bottom: '60%',
width: '24%',
height: '24%',
},
glass: {
src: 'images/samples/layers/gallery/glass-top-3.png',
left: '69.375%',
top: '16.25%',
width: '11.84%',
},
button: {
right: '2.5%',
bottom: '34%',
width: '23%',
height: '23%',
},
},
]
```

Then we set up three objects in an array which contain information for each of the three pictures depicted:
`offsetShift` is used for the animation while switching, the object `image` contains all the information about the start image source and coordinates.
The object `glass` defines the glass top layer, the object `button` sets the coordinates for the button used to switch the image.

```js
document.addEventListener('DOMContentLoaded', () => {
const container = document.getElementById('layersEle')
if (container.firstChild) return // viewers already setup
```

When the DOM content is loaded, we check the ID `layersEle.
If there is already an element set as child, the viewer is already setup.

```js
container.addEventListener('mouseover', () => {
document.querySelectorAll('button.btn-shifter').forEach((el) => {
el.classList.add('btn-show')
})
})
container.addEventListener('mouseleave', () => {
document.querySelectorAll('button.btn-shifter').forEach((el) => {
el.classList.remove('btn-show')
})
})
```
Here we add the event listeners which show or hide the buttons on mouseover and mouseleave.

```js
// create layers
const instance = $FSI.createNode('fsi-layers', {
id: 'myLayers',
renderer: 'png',
width: '1264px',
height: '843px',
skin: 'white',
debug: true,
showInfo: false,
onReady: () => {
// add picture layer behind the room image
instance.addGroup('_root', { name: 'pic-canvas' })

      // add background layer
      instance.addLayer('container', {
        src: backgroundImage,
      })
      // add all image frames
      pictures.forEach((pic, index) => {
        instance.addLayer('pic-canvas', {
          name: 'pic-' + index,
          ...pic.image,
        })
      })
      // add all glass reflection layers
      pictures.forEach((pic, index) => {
        instance.addLayer('_root', {
          name: 'glass-' + index,
          ...pic.glass,
        })
      })

      // add controls
      pictures.forEach((pic, index) => {
        instance.addLayer(
          '_root',
          {
            name: 'btn-' + index,
            ...pic.button,
          },
          'btn-' + index,
          '<button class="btn text-white btn-shifter bg-success bg-gradient" onclick="changeArt(this, ' +
            index +
            ')"><i class="bi bi-chevron-down"></i></button>',
        )
      })
    },
})
container.appendChild(instance)
})
```
Now we create FSI Layers: `$FSI.createNode` sets up the FSI Layer instance. `onReady` we add the picture layer behind the room image, the background image,
all artworks, the glass layers and controls.

The instance is then appended to `layersEle`.


```js
//change images on click
const changeArt = (btn, buttonID) => {
btn.classList.add('d-none')
let picture = pictures[buttonID]
if (picture) {
picture.number++
if (picture.number >= imageList.length) {
picture.number = 0
}
const instance = document.getElementById('myLayers')

    const anim = {
      mainFunc: function (timeStep) {
        if (timeStep) {
          anim.update(timeStep)
          anim.redraw()
        } else {
          if (!this.round) this.round = 0
          this.elapsed = 0
        }

        if (this.elapsed < this.duration && this.round < 2) {
          window.requestAnimationFrame(this.mainFunc)
        } else if (this.round < 2) {
          this.instance.setProperties('pic-' + buttonID, { src: this.newSrc })
          this.instance.render()
          delete this.startTimeStep
          this.offStart = this.picture.offsetShift
          this.offStop = -this.picture.offsetShift
          this.round++
          this.mainFunc()
        }
        else {
          btn.classList.remove('d-none')
        }
      },
      update: function (timeStep) {
        if (!this.startTimeStep) this.startTimeStep = timeStep
        this.elapsed = timeStep - this.startTimeStep
        this.y = anim.easeInOutQuad(this.elapsed, this.offStart, this.offStop, this.duration)
      },
      redraw: function () {
        this.instance.setProperties(this.layerName, { offsetY: this.y })
        this.instance.render()
      },
      easeInOutQuad: function (t, s, e, d) {
        if ((t /= d / 2) < 1) return (e / 2) * t * t + s
        return (-e / 2) * (--t * (t - 2) - 1) + s
      },
      instance: instance,
      picture: picture,
      newSrc: imageList[picture.number],
      layerName: 'pic-' + buttonID,
      duration: 750,
      offStart: 0,
      offStop: picture.offsetShift,
    }
    anim.mainFunc = anim.mainFunc.bind(anim)
    anim.mainFunc()
}
}
```

`changeArt` enables the cycling through the images and `anim` creates the little offset animation.
