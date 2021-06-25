// https://jsfiddle.net/greypants/msuYF/

FLA = {
  frame: function () {
    APP.core.setDelta()
    APP.core.update()
    APP.core.render()
    APP.core.animationFrame = window.requestAnimationFrame(APP.core.frame)
  },

  setDelta: function () {
    APP.core.now = Date.now()
    APP.core.delta = (APP.core.now - APP.core.then) / 1000 // seconds since last frame
    APP.core.then = APP.core.now
  },

  update: function () {
    // Update values
    // var distance = 100 * APP.core.delta;
    // APP.thing.x += distance;
  },

  render: function () {
    // Render updates to browser (draw to canvas, update css, etc.)
  },

  easeInCubic: function (t) {
    return t * t * t
  },

  easeOutCubic: function (t) {
    return 1 - Math.pow(1 - t, 3)
  },
}
