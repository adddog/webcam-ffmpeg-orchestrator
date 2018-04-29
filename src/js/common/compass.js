class Compass {
  constructor() {
    this._events = []

    const handleOrientation = e => {
      let angle = 0
      if (e.webkitCompassHeading) {
        angle = 360 - e.webkitCompassHeading
      } else if (e.alpha) {
        angle = e.alpha
      }
      for (var i = 0; i < this._events.length; i++) {
        this._events[i](angle)
      }
    }

    if ("ondeviceorientationabsolute" in window) {
      // Chrome 50+ specific
      window.addEventListener(
        "deviceorientationabsolute",
        handleOrientation
      )
    } else if ("ondeviceorientation" in window) {
      window.addEventListener("deviceorientation", handleOrientation)
    }
  }

  add(callback) {
    this._events.push(callback)
  }
}
export default new Compass()
