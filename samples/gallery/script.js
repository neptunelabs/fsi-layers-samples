imgCounter = 0;
const imageList = [
  "images/samples/layers/gallery/art-0.png",
  "images/samples/layers/gallery/art-2.png",
  "images/samples/layers/gallery/art-3.png",
  "images/samples/layers/gallery/art-4.png",
  "images/samples/layers/gallery/art-5.png",
  "images/samples/layers/gallery/art-6.png",
  "images/samples/layers/gallery/art-7.png",
  "images/samples/layers/gallery/art-8.png",
  "images/samples/layers/gallery/art-1.png",
  "images/samples/layers/gallery/art-9.png",
  "images/samples/layers/gallery/art-10.png",
  "images/samples/layers/gallery/art-11.png",
  "images/samples/layers/gallery/art-12.png",
]

document.addEventListener('DOMContentLoaded', () => {
 const container = document.getElementById('layersEle');
  if (container.firstChild) return; // viewers already setup

  const show = () => {
    console.log('show should happen now?')
    //add glass layers
    instance.addLayer("container", {
      "name": "glass-left",
      "src": "images/samples/layers/gallery/glass-top.png",
      "left":"21.8%","bottom":"59.5%","width":"24%", "height":"24%"
    });
    instance.addLayer("container", {
      "name": "glass-right",
      "src": "images/samples/layers/gallery/glass-top.png",
      "right":"18.4%","bottom":"60%","width":"24%", "height":"24%"
    });
    // add background Layer in foreground
    instance.addLayer("container", {
      "name": "background",
      "id": "background",
      "src": "images/samples/layers/gallery/image-wall.png"
    });
    instance.addLayer("container", {
      "name": "glass-center",
      "src": "images/samples/layers/gallery/glass-top.png",
      "right":"37.8%","bottom":"47.9%","width":"38%", "height":"38%",
    });
  }
  const instance =  $FSI.createNode("fsi-layers", {
    id: "myLayers",
    renderer: "png",
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

  // add art Layers
  const layersArt1 = $FSI.createNode("fsi-layer", {
      name: 1,
    "src":imageList[0],
    "left":"21.8%","bottom":"59.5%","width":"24%", "height":"24%", "opactiy" :"0.9"
    }
  );
  layersContainer.appendChild(layersArt1);

  const layersArt2 = $FSI.createNode("fsi-layer", {
      name: 2,
      "src":imageList[3],
    "right":"39.7%","bottom":"49.2%","width":"31%", "height":"31%", "opactiy" :"0.9"
    }
  );
  layersContainer.appendChild(layersArt2);

  const layersArt3 = $FSI.createNode("fsi-layer", {
      name: 3,
      "src":imageList[4],
    "right":"18.4%","bottom":"60%","width":"24%", "height":"24%", "opactiy" :"0.9"
    }
  );
  layersContainer.appendChild(layersArt3);


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
