# Kitchen - FSI Layers Configurator Example

This demo shows a simple configurator based on *FSI Layers*.

In order to keep the demo simple, the layers are all described as HTML tags and only the function change of the layers in JavaScript is explained here.
### Description
The controls are implemented in Bootstrap for simplicity in this demo.

All elements in the index.html file below the ```<fsi-layers>`` tag are for the configurator controls only and can be replaced at will.

The template ``{{sources.images}}}`` in the src attribute is replaced by Grunt with the variables written in the env.yml project file.

In the Kitchen JavaScript class, only the ``cfgChange`` method is relevant.
This class is initialised by *FSI-Layers* with the callback ``onReady``. The FSI-Layers element is saved as a class property and the side menu is initialised.

The ``cfgChange`` method reacts to the element ID of the called element. Depending on this, a new property value is passed to an assigned layer.
Then FSI Layers is told to recalculate the layers.


```javascript
this.layers.setProperties([layerName], newProps)
this.layers.render()
```

Depending on the connection, reloading other layers can take a while, so the ``onLoadChange`` event callback is defined in the ``<fsi-layers>`` element.
This method fades in and out a spinner loading element.


### How to create an own images for a configurator with FSI Layers

Depending on whether you are using real photos or a CGI (computer generated image)
(computer generated image), the preparation work for creating the layers can be
more or less complicated.

In this example, a CGI was created using Maxon Cinema 4D.
Two scenes were rendered for this purpose.

One without equipment:

![Kitchen Empty](img/kitchen_empty.jpg)

And a scene with everything that should be addable.

![Kitchen Full](img/kitchen_full.jpg)

Alpha channels have been automatically created for certain objects.
This makes it easy to select and crop individual objects in an image editing program such as
program such as Photoshop, Affinity or GIMP.

![Plant Free](img/plant_free.jpg)

The shadow is also very important in this scene, so it makes sense to calculate it separately and assign it to the layers accordingly.

![Shadows](img/kitchen_shadows.jpg)

If certain objects are to be coloured by the image server, a path or alpha channel must be stored.
In this example, the toaster has an alpha channel for the coloured surface.

![Shadows](img/toaster_alpha.jpg)
![Shadows](img/toaster_selected.jpg)

With the "effect" parameter, the whole(!) image is reloaded.
This is not really useful, but for the sake of completeness it is shown here in this demo,
so that you can see how something like this would work.

### Testing with images from your own server

To test the examples with images from your own [FSI Server](https://www.neptunelabs.com/fsi-server/), please first copy the env.yml.dist file to env.yml and adapt the file, then restart the main demo again.
