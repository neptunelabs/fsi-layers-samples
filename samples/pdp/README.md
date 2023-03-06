# Product detail page - FSI Layers JS built

In this example, FSI Layers is not defined as an HTML tag,
but generated entirely by JavaScript.

The ``index.html`` is just a template that is filled by ``pds.js``.

After loading and initialising the PDP class, the ``bread-data.json`` file is loaded.
We simulate loading only the data needed to be used by a backend via REST.

If this is successful, the function ``buildFSILayers`` is called and an FSI layer is created using
``$FSI.Layers.init``.
On creation, the ``onReady`` event listener is told to call ``initProduct`` after creation.
after creation.

That's basically the gist of the demo, since after the above steps are completed, the data loaded via REST is simply converted to buttons.
into buttons.
These buttons then have corresponding event listeners to show and hide
the layers:

```javascript
showLayer(groupName, name)
{
// hide/show fsi-layer within a group
    this.layerEl.setProperties(this.getLayerName(groupName, name), {hidden: false})
    if (this.getSelection(groupName) !== name) {
        this.layerEl.setProperties(this.getLayerName(groupName, this.getSelection(groupName)), {hidden: true})
    }

    this.layerEl.render()
}
```
