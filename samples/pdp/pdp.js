const productDataFile = 'bread-data.json'

class PDP {
  constructor(dataFile) {
    this.dataFile = dataFile

    this.productData = {}
    this.selection = {}

    // Templates defined in project/env.yml and replaced by grunt
    this.fsiServer = '{{{fsi.server}}}/{{{fsi.context}}}'
    this.srcRoot = '{{{sources.images}}}/product-detail'
    this.assetRoot = '{{{sources.static}}}/product-detail'

    this.dataFile = this.fsiServer + '/static/' + this.assetRoot + '/' + dataFile
  }

  /*
   Load a JSON via REST - there is no exception handling here
   */
  init() {
    let reqHeader = new Headers()
    reqHeader.append('Content-Type', 'text/json')
    let initObject = {
      method: 'GET',
      headers: reqHeader,
    }

    const that = this
    fetch(this.dataFile, initObject)
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        // expose loaded product data
        that.productData = data
        // Start build fsi-layers before rendering other stuff
        that.buildFSILayers()
      })
      .catch(function (err) {
        console.log('Something went wrong!', err)
      })
  }

  /*
   Create a new FSI Layer instance - launch initProduct after the instance is ready
   */
  buildFSILayers() {
    const containerEl = document.getElementById('fsiLayersContainer')
    this.fsiLayersEl = new $FSI.Layers()
    this.fsiLayersEl.init(containerEl, {
      name: 'articleLayer',
      debug: false,
      useDevicePixelRatio: true,
      onReady: () => {
        this.initProduct()
      },
    })
    this.fsiLayersEl.id = 'articleLayer'
    this.fsiLayersEl.start()
  }

  /*
   Fill the data from json into HTML elements from the template
   */
  initProduct() {
    this.fill('productName', this.productData.name)
    this.fill('productProducer', this.productData.producer)
    this.fill('productSeller', this.productData.seller)

    this.fill('productRatings', this.productData.rating.ratings)
    this.writeStars('productStars', this.productData.rating.stars)

    this.fill('productDescHead', this.productData.detail.head)
    this.fill('productDescHTML', this.productData.detail.html, true)

    this.setProgress(this.productData.stockCount)
    this.addMouseMeter(this.productData.stockCount)

    this.buildLayerAccordion()

    this.handleLayerSelector(this.productData.initLayer, true)
  }

  /*
   Build Bootstrap Accordion for Layer controls
   Iterate JSON product data to add FSI Layers and control elements to HTML
   */
  buildLayerAccordion() {
    const selAccordionEl = document.createElement('div')
    selAccordionEl.classList.add('accordion')
    selAccordionEl.setAttribute('id', 'layerAccordion')
    let isFirstElement = true
    Object.keys(this.productData.products).forEach((groupName) => {
      this.fillLayers(this.fsiLayersEl, groupName, this.productData.products[groupName])

      const selAccordionItemEl = document.createElement('div')
      selAccordionItemEl.classList.add('accordion-item')
      const selAccordionHeaderEl = document.createElement('h2')
      selAccordionHeaderEl.classList.add('accordion-header')
      selAccordionHeaderEl.id = 'heading_' + groupName
      const selAccordionButtonEl = document.createElement('button')
      selAccordionButtonEl.classList.add('accordion-button', 'h5', 'py-2')
      if (!isFirstElement) {
        selAccordionButtonEl.classList.add('collapsed')
      } else {
        selAccordionButtonEl.classList.add('accordion-button-fixed')
      }
      selAccordionButtonEl.setAttribute('type', 'button')
      selAccordionButtonEl.setAttribute('data-bs-toggle', 'collapse')
      if (!isFirstElement) selAccordionButtonEl.setAttribute('data-bs-target', '#collapse_' + groupName)
      selAccordionButtonEl.setAttribute('aria-expanded', isFirstElement)
      if (!isFirstElement) selAccordionButtonEl.setAttribute('aria-controls', 'collapse_' + groupName)
      const headerText = document.createTextNode(this.productData.products[groupName]['_'].name)
      selAccordionButtonEl.appendChild(headerText)
      selAccordionButtonEl.addEventListener('click', (evt) => {
        this.handleLayerSelector(groupName, !evt.target.classList.contains('collapsed'))
      })

      selAccordionHeaderEl.appendChild(selAccordionButtonEl)
      selAccordionItemEl.appendChild(selAccordionHeaderEl)

      const selAccordionCollapseEl = document.createElement('div')
      selAccordionCollapseEl.classList.add('accordion-collapse', 'collapse')
      if (isFirstElement) {
        selAccordionCollapseEl.classList.add('show')
      }
      selAccordionCollapseEl.setAttribute('id', 'collapse_' + groupName)
      selAccordionCollapseEl.setAttribute('aria-labelledby', 'heading_' + groupName)

      const selAccordionBodyEl = document.createElement('div')
      selAccordionBodyEl.classList.add('accordion-body')

      const formSelectorTextEl = document.createElement('div')
      formSelectorTextEl.setAttribute('id', this.getCheckName(groupName))
      const selectorTextEl = document.createTextNode(this.productData.products[groupName]['_'].name)
      formSelectorTextEl.appendChild(selectorTextEl)

      selAccordionBodyEl.appendChild(formSelectorTextEl)

      const formSelector = this.buildLayerSelector(groupName, this.productData.products[groupName])
      selAccordionBodyEl.appendChild(formSelector)

      selAccordionCollapseEl.appendChild(selAccordionBodyEl)

      selAccordionItemEl.appendChild(selAccordionCollapseEl)
      selAccordionEl.appendChild(selAccordionItemEl)

      isFirstElement = false
    })

    const layerSwitchesEl = document.getElementById('layerSwitches')
    layerSwitchesEl.appendChild(selAccordionEl)
  }

  /*
  Build FSI Layer Groups and Layer nodes
  */
  fillLayers(layerElement, groupName, groupData) {
    layerElement.addGroup('_root', {
      name: groupName,
      hidden: true,
    })

    Object.keys(groupData).forEach((groupKey) => {
      if (groupKey !== '_') {
        const layerData = {
          ...groupData[groupKey].layer,
          name: this.getLayerName(groupName, groupKey),
          src: this.srcRoot + '/' + groupData[groupKey].img,
          hidden: true,
        }

        layerElement.addLayer(groupName, layerData)
      }
    })
  }

  buildLayerSelector(groupName, groupData) {
    const selectorEl = document.createElement('div')
    selectorEl.id = this.getSelectorName(groupName)
    selectorEl.classList.add('layerSelector')

    Object.keys(groupData).forEach((groupKey) => {
      if (groupKey !== '_') {
        const data = groupData[groupKey]

        const inputEl = document.createElement('input')
        inputEl.classList.add('btn-check')
        inputEl.id = this.getSelectorRadioName(groupName, groupKey)
        inputEl.setAttribute('name', inputEl.id)
        inputEl.setAttribute('layerName', groupKey)
        inputEl.setAttribute('type', 'radio')
        inputEl.setAttribute('autocomplete', 'off')
        inputEl.setAttribute('name', 'sel_' + groupName)
        inputEl.addEventListener('click', (event) => {
          this.showLayer(groupName, event.target.getAttribute('layerName'))
        })

        selectorEl.appendChild(inputEl)

        const labelEl = document.createElement('label')
        labelEl.classList.add('btn', 'btn-pdp-layer', 'm-1')
        labelEl.setAttribute('for', inputEl.id)

        const tooltip = new bootstrap.Tooltip(labelEl, {
          title: data.comment,
        })

        const labelImgEl = document.createElement('img')
        labelImgEl.setAttribute('height', '80')
        labelImgEl.src = this.fsiServer + '/server?type=image&source=' + this.srcRoot + '/' + data.img + '&height=160'

        labelEl.appendChild(labelImgEl)
        selectorEl.appendChild(labelEl)
      }
    })

    return selectorEl
  }

  /*
   Insert data into elements
   */
  fill(id, content, isHTML) {
    const el = document.getElementById(id)
    if (el) {
      if (isHTML) el.insertAdjacentHTML('beforeend', content)
      else el.textContent = content
    }
  }

  /*
   Write rating stars as tags
   */
  writeStars(id, value) {
    const fullStars = Math.floor(value)
    const halfStars = value - fullStars
    for (let s = 0; s < fullStars; s++) {
      this.fill(id, '<i class="bi bi-star-fill"></i>', true)
    }
    if (halfStars < 0.25) {
      this.fill(id, '<i class="bi bi-star"></i>', true)
    } else if (halfStars < 0.9) {
      this.fill(id, '<i class="bi bi-star-half"></i>', true)
    } else {
      this.fill(id, '<i class="bi bi-star-fill"></i>', true)
    }
  }

  getCheckName(groupName) {
    return 'check_' + groupName
  }

  getSelectorName(groupName) {
    return 'selector_' + groupName
  }

  getSelectorRadioName(groupName, name) {
    return this.getSelectorName(groupName) + '_' + name
  }

  getLayerName(groupName, groupKey) {
    return groupName + '_' + groupKey
  }

  handleLayerSelector(id, visible) {
    const selectorName = this.getSelectorName(id)

    if (visible) {
      // get first layer in group
      if (!this.getSelection(id)) {
        let firstName
        for (const [key] of Object.entries(this.productData.products[id])) {
          if (key !== '_') {
            firstName = key
            break
          }
        }

        this.showLayer(id, firstName)
      } else {
        this.showLayer(id, this.getSelection(id))
      }

      this.setSelection(id, null, true)
    }
    // hide Layer-Selector
    else {
      this.setSelection(id, null, false)
    }

    // hide/show fsi-layer group
    this.fsiLayersEl.setProperties(id, { hidden: !visible })
    this.fsiLayersEl.render()

    this.calcPrice()
  }

  showLayer(groupName, name) {
    // hide/show fsi-layer within a group
    this.fsiLayersEl.setProperties(this.getLayerName(groupName, name), { hidden: false })
    if (this.getSelection(groupName) !== name) {
      this.fsiLayersEl.setProperties(this.getLayerName(groupName, this.getSelection(groupName)), { hidden: true })
    }
    this.fsiLayersEl.render()

    this.setSelection(groupName, name, true)

    // write text to checkbox label
    const layerText = this.productData.products[groupName][name].comment
    this.fill(this.getCheckName(groupName), layerText)

    const radioId = this.getSelectorRadioName(groupName, name)
    document.getElementById(radioId).click()

    this.calcPrice()
  }

  setSelection(groupName, name, show) {
    this.selection['_'] = groupName
    if (!this.selection[groupName]) this.selection[groupName] = {}
    this.selection[groupName].visible = show
    if (name) {
      this.selection[groupName].name = name
    }
  }

  getSelection(groupName) {
    if (this.selection[groupName]) return this.selection[groupName].name
    return null
  }

  /*
   Calc end price
   */
  calcPrice() {
    let price = this.productData.price
    Object.entries(this.selection).forEach(([key, value]) => {
      if (value.visible) {
        price += this.productData.products[key][value.name].price
      }
    })

    const priceTotalEl = document.getElementById('priceTotal')

    priceTotalEl.textContent = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(price)
  }

  /*
   Change Progress Meter
   */
  setProgress(value) {
    let stockCounterEl = document.getElementById('stockCounter')
    let stockParentEl = document.getElementById('stockParent')
    stockCounterEl.style.width = value + '%'
    if (value > 0) {
      stockCounterEl.textContent = value + ' in stock'
      stockParentEl.textContent = ''
    } else {
      stockParentEl.textContent = 'Sold out!'
    }
  }

  /*
   Add 'Sold out' event handler
   */
  addMouseMeter(maxInStock) {
    window.addEventListener('mousemove', (mouseEvent) => {
      const cardBtnEl = document.getElementById('cardBtn')
      const distance = this.getMouseDistance(mouseEvent, cardBtnEl)
      if (distance < 200) {
        // cubic approximate function
        let inStock1 = Math.min(maxInStock, Math.max(0, distance - maxInStock)) / maxInStock
        let inStock31 = Math.round((1 - Math.pow(1 - inStock1, 2)) * maxInStock)

        this.setProgress(inStock31)

        if (inStock31 <= 0 && !cardBtnEl.getAttribute('disabled')) {
          cardBtnEl.setAttribute('disabled', 'disabled')
        } else if (distance >= 100 && cardBtnEl.getAttribute('disabled')) {
          cardBtnEl.removeAttribute('disabled')
        }
      }
    })
  }

  /*
   Calc mouse distance to 'Add to Cart' button - for 'Sold out' function
   */
  getMouseDistance(mouseEvent, el) {
    const rect = el.getBoundingClientRect()

    const elX = (rect.right - rect.left) / 2 + rect.left
    const elY = (rect.bottom - rect.top) / 2 + rect.top

    const dx = elX + (window.pageXOffset || document.documentElement.scrollLeft) - mouseEvent.pageX
    const dy = elY + (window.pageYOffset || document.documentElement.scrollTop) - mouseEvent.pageY

    return Math.abs(Math.round(Math.sqrt(dx * dx + dy * dy)))
  }
}

// Start everything if DOM is ready
document.addEventListener('DOMContentLoaded', (event) => {
  // load and init product data
  const pdl = new PDP(productDataFile)
  pdl.init()
})
