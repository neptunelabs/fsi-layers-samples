document.addEventListener('DOMContentLoaded', () => {
  imgCounter = 0;
  const imageList = ["images/samples/layers/gallery/boho-art-6654957_1920.jpg", "images/samples/layers/gallery/sign-post-5655110_1920.png", "images/samples/layers/gallery/abstract-art-7093399_1920.jpg"]
  const container = document.getElementById('layersEle');
  if (container.firstChild) return; // viewers already setup

  const show = () => {
    console.log('show should happen now?')
    // show FSI Viewer instance and hide image
    instance.addLayer("container", {"name":"art-1", "id":"art-1", "src":"images/samples/layers/gallery/boho-art-6654957_1920.jpg", "left":"23%","bottom":"60%","width":"23%", "height":"23%", });
    instance.addLayer("container", {"name":"art-2", "id":"art-2", "src":"images/samples/layers/gallery/abstract-art-7093399_1920.jpg", "right":"41.5%","bottom":"50%","width":"29%", "height":"29%", });
    instance.addLayer("container", {"name":"art-3", "id":"art-3", "src":"images/samples/layers/gallery/abstract-rainbow-6296890_1920.jpg", "right":"19.5%","bottom":"61%","width":"22%", "height":"22%", });
  }

  const instance =  $FSI.createNode("fsi-layers", {
    id: "myLayers",
    width: '1150px',
    height: '767px',
    skin: 'white',
    debug: true,
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

  const layersButtonContainer = $FSI.createNode("fsi-layer-group", {
    name: "buttons",
    width: '100%',
    height: '100%',
  });
  layersRoot.appendChild(layersButtonContainer);

  const layersButton1 = $FSI.createNode("fsi-layer", {
      name: "button",
      left:"27.5%",
      bottom:"34%",
      width:"23%",
      height:"23%"
    }
  );
  layersButton1.innerHTML = "<button class=\"btnLayers\"  id=\"button-1\" onclick=\"changeArt('1-1')\">\n" +
    "              <i class=\"bi bi-caret-down-fill\"></i>\n" +
    "            </button>";

  layersButtonContainer.appendChild(layersButton1);
})

function changeArt(buttonID) {
  switch (buttonID) {
    case "1-1":
      const instance = document.getElementById('myLayers');
      console.log('button 1, something happens!')
      instance.setProperties("art-1", {"src":"images/samples/layers/gallery/sign-post-5655110_1920.png"});
      instance.render();
      break
  }
}

function changeImage(buttonID) {
  let img;
  let curImage = document.getElementById('image');
  switch (buttonID) {
    case "0":
      img =  '{{&fsi.server}}/{{&fsi.context}}/server?type=image&source=images/samples/layers/gallery/boho-art-6654957_1920.jpg&width=940';
      break
    case "1":
      img = '{{&fsi.server}}/{{&fsi.context}}/server?type=image&source=images/samples/layers/gallery/sign-post-5655110_1920.png&width=940';
      break
    case "2":
      img = '{{&fsi.server}}/{{&fsi.context}}/server?type=image&source=images/samples/layers/gallery/abstract-art-7093399_1920.jpg&width=940';
      break
    case "3":
      img = '{{&fsi.server}}/{{&fsi.context}}/server?type=image&source=images/samples/layers/gallery/cat-8185712_1920.jpg&width=940';
      break
    case "4":
      img = '{{&fsi.server}}/{{&fsi.context}}/server?type=image&source=images/samples/layers/gallery/painting-6556384_1920.jpg&width=940';
      break
    case "5":
      img = '{{&fsi.server}}/{{&fsi.context}}/server?type=image&source=images/samples/layers/gallery/abstract-rainbow-6296890_1920.jpg&width=940';
      break
    default:
      img = '{{&fsi.server}}/{{&fsi.context}}/server?type=image&source=images/samples/layers/gallery/boho-art-6654957_1920.jpg&width=940';
  }
  curImage.src = img;
}
