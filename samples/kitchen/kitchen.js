let kitchen

function initKitchen() {
  kitchen = new Kitchen()
}

function loadChange(state) {
  const spnEl = document.getElementById('loadingSpinner')
  if (state) {
    spnEl.classList.remove('invisible')
  } else {
    spnEl.classList.add('invisible')
  }
}

function cfgChange(el) {
  kitchen.cfgChange(el)
}

class Kitchen {
  constructor() {
    this.toasterHSL = [358, 85, 20]
    this.fsiLayersEl = document.getElementById('kitchen')
    const offCanvasEl = document.getElementById('offcanvasRight')
    offCanvasEl.addEventListener('hidden.bs.offcanvas', function () {
      const btnEl = document.getElementById('btnConfigurator')
      btnEl.classList.remove('invisible')
    })
    offCanvasEl.addEventListener('shown.bs.offcanvas', function () {
      const btnEl = document.getElementById('btnConfigurator')
      btnEl.classList.add('invisible')
    })
  }

  cfgChange(el) {
    let layerName
    let propName
    let propState
    switch (el.id) {
      case 'checkChildProof':
        layerName = 'knifes'
        propName = 'hidden'
        propState = el.checked
        this.fsiLayersEl.setProperties(['knifes'], {
          hidden: el.checked,
        })
        break
      case 'checkO2Gen':
        layerName = 'plant'
        propName = 'hidden'
        propState = !el.checked
        break
      case 'checkSun1':
        layerName = 'hanging-lamp'
        propName = 'hidden'
        propState = !el.checked
        const inputSun1ElList = el.parentElement.getElementsByTagName('input')
        for (const inputEl of inputSun1ElList) {
          if (inputEl.type === 'range') {
            inputEl.disabled = !el.checked
          }
        }
        break
      case 'checkSun2':
        layerName = 'design-lamp'
        propName = 'hidden'
        propState = !el.checked
        const inputSun2ElList = el.parentElement.getElementsByTagName('input')
        for (const inputEl of inputSun2ElList) {
          if (inputEl.type === 'range') {
            inputEl.disabled = !el.checked
          }
        }
        break
      case 'checkChillOut':
        layerName = 'seating-group'
        propName = 'hidden'
        propState = !el.checked
        const inputChillElList = el.parentElement.getElementsByTagName('input')
        for (const inputEl of inputChillElList) {
          if (inputEl.type === 'radio') {
            inputEl.disabled = !el.checked
          }
        }
        break
      case 'rangeSun1':
        layerName = 'hanging-lamp'
        propName = 'offsetX'
        propState = el.value
        break
      case 'rangeSun2':
        layerName = 'design-lamp'
        propName = 'offsetX'
        propState = el.value
        break
      case 'checkChillColor1':
        layerName = 'seating-group'
        propName = 'effects'
        propState = null
        break
      case 'checkChillColor2':
        layerName = 'seating-group'
        propName = 'effects'
        propState = 'select(New,Alpha,2),colorize(204,20,0)'
        break
      case 'checkChillColor3':
        layerName = 'seating-group'
        propName = 'effects'
        propState = 'select(New,Alpha,2),colorize(135,20,0)'
        break
      case 'checkChillColor4':
        layerName = 'seating-group'
        propName = 'effects'
        propState = 'select(New,Alpha,2),colorize(58,20,0)'
        break
      case 'toasterColorHue':
        this.toasterHSL[0] = el.value
        layerName = 'kitchen'
        propName = 'effects'
        propState = 'select(New,Alpha,1),colorize(' + this.toasterHSL.join(',') + ')'
        break
      case 'toasterColorSat':
        this.toasterHSL[1] = el.value
        layerName = 'kitchen'
        propName = 'effects'
        propState = 'select(New,Alpha,1),colorize(' + this.toasterHSL.join(',') + ')'
        break
    }
    const newProps = {}
    newProps[propName] = propState
    if (layerName) {
      this.fsiLayersEl.setProperties([layerName], newProps)
      this.fsiLayersEl.render()
    }
  }
}
