document.addEventListener('DOMContentLoaded', () => {
 let instance

  document.getElementById('layersBtn').addEventListener('click', () => {

    const show = () => {
      // show FSI Viewer instance and hide image
      document.getElementById('layersEle').style.visibility = 'visible'
      document.getElementById('layersImg').style.display = 'none'
      //addLayers
      console.log('doStuff should happen now?')
     }

    const container = document.getElementById('layersEle');
    if (container.firstChild) return; // viewers already setup

    const instance =  $FSI.createNode("fsi-layers", {
      id: "myLayers",
      width: '1000px',
      height: '667px',
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
  })


})

function changeArt(buttonID) {
  let el1 = document.getElementById('art-1');
  const name = document.getElementById('myLayers').getChildNameAt('container', 2)
  console.log(name)
  switch (buttonID) {
    case "1-1":
      if (el1 != null) {
        console.log('button 1, element exists', el1)
        document.getElementById('myLayers').setProperties("art-1", {"left":"23%","bottom":"60%","width":"23%", "height":"23%"});
        document.getElementById('myLayers').render()
      }  // viewers already setup
      else {
        console.log('button 1, element does not exist', el1)
        document.getElementById('myLayers').addLayer("container", {"name":"art-1-1", "id":"art-1", "src":"images/samples/layers/gallery/boho-art-6654957_1920.jpg", "left":"23%","bottom":"60%","width":"23%", "height":"23%", });
        document.getElementById('myLayers').render()
      }
      break
    case "1-2":
      if (el1 != null) {
        console.log('button 2, element exists', el1)
        document.getElementById('myLayers').setProperties("art-1", {"right":"41.5%","bottom":"50%","width":"29%", "height":"29%"});
        document.getElementById('myLayers').render()
      }
      else {
        console.log('button 2, element does not exist', el1)
        document.getElementById('myLayers').addLayer("container", {"name":"art-1-2", "id":"art-1", "src":"images/samples/layers/gallery/boho-art-6654957_1920.jpg", "right":"41.5%","bottom":"50%","width":"29%", "height":"29%", });
        document.getElementById('myLayers').render()
      }

      break
    case "1-3":
      document.getElementById('myLayers').addLayer("container", {"name":"art-1-3", "id":"art-1", "src":"images/samples/layers/gallery/boho-art-6654957_1920.jpg", "right":"19.5%","bottom":"61%","width":"22%", "height":"22%", });
      document.getElementById('myLayers').render()
      break

    case "2-1":
      if (el1 != null) {
        console.log('button 1, element exists', el1)
        document.getElementById('myLayers').setProperties("art-1", {"left":"23%","bottom":"60%","width":"23%", "height":"23%"});
        document.getElementById('myLayers').render()
      }  // viewers already setup
      else {
        console.log('button 1, element does not exist', el1)
        document.getElementById('myLayers').addLayer("container", {"name":"art-2-1", "id":"art-1", "src":"images/samples/layers/gallery/sign-post-5655110_1920.png", "left":"23%","bottom":"60%","width":"23%", "height":"23%", });
        document.getElementById('myLayers').render()
      }
      break
    case "2-2":
      if (el1 != null) {
        console.log('button 2, element exists', el1)
        document.getElementById('myLayers').setProperties("art-1", {"right":"41.5%","bottom":"50%","width":"29%", "height":"29%"});
        document.getElementById('myLayers').render()
      }
      else {
        console.log('button 2, element does not exist', el1)
        document.getElementById('myLayers').addLayer("container", {"name":"art-2-2", "id":"art-1", "src":"images/samples/layers/gallery/sign-post-5655110_1920.png", "right":"41.5%","bottom":"50%","width":"29%", "height":"29%", });
        document.getElementById('myLayers').render()
      }

      break
    case "2-3":
      document.getElementById('myLayers').addLayer("container", {"name":"art-2-3", "id":"art-1", "src":"images/samples/layers/gallery/sign-post-5655110_1920.png", "right":"19.5%","bottom":"61%","width":"22%", "height":"22%", });
      document.getElementById('myLayers').render()
      break

    case "3-1":
      if (el1 != null) {
        console.log('button 1, element exists', el1)
        document.getElementById('myLayers').setProperties("art-1", {"left":"23%","bottom":"60%","width":"23%", "height":"23%"});
        document.getElementById('myLayers').render()
      }  // viewers already setup
      else {
        console.log('button 1, element does not exist', el1)
        document.getElementById('myLayers').addLayer("container", {"name":"art-3-1", "id":"art-1", "src":"images/samples/layers/gallery/abstract-art-7093399_1920.jpg", "left":"23%","bottom":"60%","width":"23%", "height":"23%", });
        document.getElementById('myLayers').render()
      }
      break
    case "3-2":
      if (el1 != null) {
        console.log('button 2, element exists', el1)
        document.getElementById('myLayers').setProperties("art-1", {"right":"41.5%","bottom":"50%","width":"29%", "height":"29%"});
        document.getElementById('myLayers').render()
      }
      else {
        console.log('button 2, element does not exist', el1)
        document.getElementById('myLayers').addLayer("container", {"name":"art-3-2", "id":"art-1", "src":"images/samples/layers/gallery/abstract-art-7093399_1920.jpg", "right":"41.5%","bottom":"50%","width":"29%", "height":"29%", });
        document.getElementById('myLayers').render()
      }

      break
    case "3-3":
      document.getElementById('myLayers').addLayer("container", {"name":"art-3-3", "id":"art-1", "src":"images/samples/layers/gallery/abstract-art-7093399_1920.jpg", "right":"19.5%","bottom":"61%","width":"22%", "height":"22%", });
      document.getElementById('myLayers').render()
      break

    case "4-1":
      if (el1 != null) {
        console.log('button 1, element exists', el1)
        document.getElementById('myLayers').setProperties("art-1", {"left":"23%","bottom":"60%","width":"23%", "height":"23%"});
        document.getElementById('myLayers').render()
      }  // viewers already setup
      else {
        console.log('button 1, element does not exist', el1)
        document.getElementById('myLayers').addLayer("container", {"name":"art-4-1", "id":"art-1", "src":"images/samples/layers/gallery/cat-8185712_1920.jpg", "left":"23%","bottom":"60%","width":"23%", "height":"23%", });
        document.getElementById('myLayers').render()
      }
      break
    case "4-2":
      if (el1 != null) {
        console.log('button 2, element exists', el1)
        document.getElementById('myLayers').setProperties("art-1", {"right":"41.5%","bottom":"50%","width":"29%", "height":"29%"});
        document.getElementById('myLayers').render()
      }
      else {
        console.log('button 2, element does not exist', el1)
        document.getElementById('myLayers').addLayer("container", {"name":"art-4-2", "id":"art-1", "src":"images/samples/layers/gallery/cat-8185712_1920.jpg", "right":"41.5%","bottom":"50%","width":"29%", "height":"29%", });
        document.getElementById('myLayers').render()
      }

      break
    case "4-3":
      document.getElementById('myLayers').addLayer("container", {"name":"art-4-3", "id":"art-1", "src":"images/samples/layers/gallery/cat-8185712_1920.jpg", "right":"19.5%","bottom":"61%","width":"22%", "height":"22%", });
      document.getElementById('myLayers').render()
      break


    case "5-1":
      if (el1 != null) {
        console.log('button 1, element exists', el1)
        document.getElementById('myLayers').setProperties("art-1", {"left":"23%","bottom":"60%","width":"23%", "height":"23%"});
        document.getElementById('myLayers').render()
      }  // viewers already setup
      else {
        console.log('button 1, element does not exist', el1)
        document.getElementById('myLayers').addLayer("container", {"name":"art-5-1", "id":"art-1", "src":"images/samples/layers/gallery/painting-6556384_1920.jpg", "left":"23%","bottom":"60%","width":"23%", "height":"23%", });
        document.getElementById('myLayers').render()
      }
      break
    case "5-2":
      if (el1 != null) {
        console.log('button 2, element exists', el1)
        document.getElementById('myLayers').setProperties("art-1", {"right":"41.5%","bottom":"50%","width":"29%", "height":"29%"});
        document.getElementById('myLayers').render()
      }
      else {
        console.log('button 2, element does not exist', el1)
        document.getElementById('myLayers').addLayer("container", {"name":"art-5-2", "id":"art-1", "src":"images/samples/layers/gallery/painting-6556384_1920.jpg", "right":"41.5%","bottom":"50%","width":"29%", "height":"29%", });
        document.getElementById('myLayers').render()
      }

      break
    case "5-3":
      document.getElementById('myLayers').addLayer("container", {"name":"art-5-3", "id":"art-1", "src":"images/samples/layers/gallery/painting-6556384_1920.jpg", "right":"19.5%","bottom":"61%","width":"22%", "height":"22%", });
      document.getElementById('myLayers').render()
      break

    case "6-1":
      if (el1 != null) {
        console.log('button 1, element exists', el1)
        document.getElementById('myLayers').setProperties("art-1", {"left":"23%","bottom":"60%","width":"23%", "height":"23%"});
        document.getElementById('myLayers').render()
      }  // viewers already setup
      else {
        console.log('button 1, element does not exist', el1)
        document.getElementById('myLayers').addLayer("container", {"name":"art-6-1", "id":"art-1", "src":"images/samples/layers/gallery/abstract-rainbow-6296890_1920.jpg", "left":"23%","bottom":"60%","width":"23%", "height":"23%", });
        document.getElementById('myLayers').render()
      }
      break
    case "6-2":
      if (el1 != null) {
        console.log('button 2, element exists', el1)
        document.getElementById('myLayers').setProperties("art-1", {"right":"41.5%","bottom":"50%","width":"29%", "height":"29%"});
        document.getElementById('myLayers').render()
      }
      else {
        console.log('button 2, element does not exist', el1)
        document.getElementById('myLayers').addLayer("container", {"name":"art-6-2", "id":"art-1", "src":"images/samples/layers/gallery/abstract-rainbow-6296890_1920.jpg", "right":"41.5%","bottom":"50%","width":"29%", "height":"29%", });
        document.getElementById('myLayers').render()
      }

      break
    case "6-3":
      document.getElementById('myLayers').addLayer("container", {"name":"art-6-3", "id":"art-1", "src":"images/samples/layers/gallery/abstract-rainbow-6296890_1920.jpg", "right":"19.5%","bottom":"61%","width":"22%", "height":"22%", });
      document.getElementById('myLayers').render()
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
