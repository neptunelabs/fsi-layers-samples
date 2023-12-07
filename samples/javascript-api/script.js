imgCounter = 0;
const imageList = [
  "images/samples/layers/gallery/art-0.jpg",
  "images/samples/layers/gallery/art-2.jpg",
  "images/samples/layers/gallery/art-3.jpg",
  "images/samples/layers/gallery/art-4.jpg",
  "images/samples/layers/gallery/art-5.jpg",
  "images/samples/layers/gallery/art-6.jpg",
  "images/samples/layers/gallery/art-7.jpg",
  "images/samples/layers/gallery/art-8.jpg",
  "images/samples/layers/gallery/art-1.jpg",
  "images/samples/layers/gallery/art-9.jpg",
  "images/samples/layers/gallery/art-10.jpg",
  "images/samples/layers/gallery/art-11.jpg",
  "images/samples/layers/gallery/art-12.jpg",
]

document.addEventListener('DOMContentLoaded', () => {
 const container = document.getElementById('layersEle');
  if (container.firstChild) return; // viewers already setup

  const show = () => {
    console.log('show should happen now?')
    // add art Layers
    instance.addLayer("container", {"name": 1, "id":"art-1", "src":imageList[0], "left":"23.2%","bottom":"60.5%","width":"22%", "height":"22%", "opactiy" :"0.9"});
    instance.addLayer("container", {"name": 2, "id":"art-2", "src":imageList[3], "right":"41.4%","bottom":"50.2%","width":"29%", "height":"29%", "opactiy" :"0.9"});
    instance.addLayer("container", {"name": 3, "id":"art-3", "src":imageList[4 ], "right":"19.5%","bottom":"60.4%","width":"23%", "height":"23%", "opactiy" :"0.9"});
  }

  const instance =  $FSI.createNode("fsi-layers", {
    id: "myLayers",
    width: '1264px',
    height: '843px',
    skin: 'white',
    debug: true,
    showInfo: false,
    onReady:show
  })
  container.appendChild(instance);

  const layersRoot = $FSI.createNode("fsi-layers-root", {});
  instance.appendChild(layersRoot);

  const layersContainer = $FSI.createNode("fsi-layer-group", {
    name: "container",
    width: '100%',
    height: '100%',
  });
  layersRoot.appendChild(layersContainer);

  const layersBack = $FSI.createNode("fsi-layer", {
      name: "background",
      id: "background",
      src: "images/samples/layers/gallery/inneneinrichtung-mit-fotorahmen.jpg"
    }
  );
  layersContainer.appendChild(layersBack);

  // add buttons
  const layersButtonContainer = $FSI.createNode("fsi-layer-group", {
    name: "buttons",
    width: '100%',
    height: '100%',
  });
  layersRoot.appendChild(layersButtonContainer);

  const layersButton1 = $FSI.createNode("fsi-layer", {
      name: "button1",
      left:"27.5%",
      bottom:"34%",
      width:"23%",
      height:"23%"
    }
  );
  layersButton1.innerHTML = "<button class=\"btnLayers\"  id=\"button-1\" onclick=\"changeArt(1)\">\n" +
    "              <i class=\"bi bi-caret-down-fill\"></i>\n" +
    "            </button>";

  layersButtonContainer.appendChild(layersButton1);

  const layersButton2 = $FSI.createNode("fsi-layer", {
      name: "button2",
    right:"25%",
    bottom:"18%",
      width:"23%",
      height:"23%"
    }
  );
  layersButton2.innerHTML = "<button class=\"btnLayers\"  id=\"button-2\" onclick=\"changeArt(2)\">\n" +
    "              <i class=\"bi bi-caret-down-fill\"></i>\n" +
    "            </button>";

  layersButtonContainer.appendChild(layersButton2);

  const layersButton3 = $FSI.createNode("fsi-layer", {
      name: "button3",
      right:"2.5%",
      bottom:"34%",
      width:"23%",
      height:"23%"
    }
  );
  layersButton3.innerHTML = "<button class=\"btnLayers\"  id=\"button-3\" onclick=\"changeArt(3)\">\n" +
    "              <i class=\"bi bi-caret-down-fill\"></i>\n" +
    "            </button>";

  layersButtonContainer.appendChild(layersButton3);
})

//change images on click
function changeArt(buttonID) {
  let imageSrc
  const instance = document.getElementById('myLayers');
  if (buttonID > 0 && buttonID < 4)
  {
    imgCounter++;
    if(imgCounter >= imageList.length) {
      imgCounter = 0;
    }
    imageSrc = imageList[imgCounter];
    instance.setProperties(buttonID, {"src":imageSrc});
    instance.render();
  }
}
