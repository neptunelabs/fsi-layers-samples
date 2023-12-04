# Product Detail Page - Using FSI Showcase for Thumbnail Image Zoom

This readme describes how the detail page example is achieved with _FSI Showcase_.
The aim of the demo is to show how you can easily integrate images with thumbnail zoom by simply adding
two simple custom tags.

To display the Showcase, simply add the following scripts to the head of your website:

```html
<script src="//fsi.domain.tld/fsi/viewer/applications/viewer/js/fsiviewer.js"></script>
<script src="//fsi.domain.tld/fsi/viewer/applications/thumbbar/js/fsithumbbar.js"></script>
```

Normally you would need to place the *<fsi-viewer>* and <fsi-thumbbar> tag in your source code where you want the viewer to be displayed.

In this example, we only want to display the viewer in a modal when a button is clicked.
This means that the viewer is initialised by JavaScript.

To do this, we have created this part in the body:

```html
<div class="col productContainer" id="productContainer">
  <img id="thumbImg" src="{{&fsi.server}}/{{&fsi.context}}/server?type=image&source=images/samples/ssi/furniture/living-room-7547558.jpg&width=600&height=600&effects=pad(CC,FFFFFF)" width="600" alt="">
  <button type="button" id="thumbBtn" class="btn btn-lg btn-outline-dark" data-bs-target="#myModal" data-bs-toggle="modal">Show Zoom</button>
</div>
<div
  id="myModal"
  class="modal fade bd-example-modal-xl"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabindex="-1"
  role="dialog"
  aria-labelledby="myExtraLargeModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="display-5 modal-title fs-5" id="myModalToggleLabel"><b>Emma</b> - Bedside Table, Natural Wood</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="showcase"
             id="showcase"
        >
        </div>
      </div>
    </div>
  </div>
</div>
```

`productContainer` is the div that contains all the elements.
`thumbImg` is the image that will be displayed on load and replaced by the viewer.
The `thumbBtn` button is used to switch from the image to the viewer.
In the Bootstrap modal, the `showcase` div will contain the FSI viewer..

The function itself can be found in the corresponding **script.js**.
```javascript
document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('thumbBtn').addEventListener('click', () => {

    const container = document.getElementById('showcase');
    if (container.firstChild) return; // viewers already setup

    container.appendChild(
      $FSI.createNode("fsi-viewer", {
        id: "zoomViewer",
        width: 1100,
        height: 600,
        skin: 'white',
        debug: true
      })
    )

    container.appendChild(
      $FSI.createNode("fsi-thumbbar", {
        src: "images/samples/ssi/furniture/living-room-7547558.jpg",
        width: "100%",
        height: 200,
        debug: true,
        imagesources: "images/samples/ssi/furniture/living-room-7547558.jpg, images/samples/ssi/furniture/living-room-7547559.jpg,images/samples/ssi/furniture/home-7547557.jpg",
        useTouchZoom: false,
        elementWidth: "350px",
        elementSpacing: "4px",
        alignment: 0.5,
        paddingTop: 0,
        autoCrop: "cc",
        viewerSelector: "#zoomViewer"
      })
    );

  })
})

```

A click on the `thumbBtn` element will initialise a new FSI Viewer and a new FSI ThumbBar element in the `showcase` element.

The viewers itself are created with `$FSI.createNode("fsi-viewer",{parameters})` and `$FSI.createNode("fsi-thumbbar",{parameters})`.

It's important to put the ID of the FSI Viewer in the ` viewerSelector: "#zoomViewer"` to ensure it is used by the ThumbBar.
