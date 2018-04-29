import QS from "query-string"
import { cover, contain } from "intrinsic-scale"
import Detector from "common/detector"
import { map } from "lodash"

let _msgTo
export const postErrMsg = str => {
}
export const postMsg = str => {
}

export const videoSettings = {
  width: { max: WIDTH },
  height: { max: HEIGHT },
  frameRate: { max: FPS },
}
export const RENDERING_KEYS = ["mainVideo", "keyVideo"]
const parseQs = QS.parse(window.location.search)
export const USE_AUDIO = !!parseQs.audio
export const COLOR_P = process.env.NODE_ENV === "production"
export const IS_PROD = process.env.NODE_ENV === "production"
export const IS_STAGE = process.env.NODE_ENV === "stage"
export const IS_DEV = process.env.NODE_ENV === "development"

export const SERVER_URL = IS_DEV
  ? "https://rad.ngrok.io/"
  : "https://rad.wtf/"

export const IS_MOBILE = !Detector.isDesktop
export const IS_DESKTOP = Detector.isDesktop
export const WIDTH = 640
export const HEIGHT = 480

export const MAX_RECORD_TIME = 5000
export const FPS = QS.parse(location.search).fps || 18
export const FPS_I = 1000 / FPS

export const RECORD_FRAMES_DELAY = 1500
export const FUDGE_VIDEO_DELAY = 3000

export const ALPHA_SENS = 50
export const AUDIO_EXP = ".webm"
export const AUDIO_EXP_TYPE = "webm"

export const KEY_W = 8
export const KEY_H = 8

export const M_SCREEN_ORIEN = "local:mobile:screenOrientation"
export const M_SCREEN_SIZE = "local:mobile:screenSize"
export const M_DEVICE_MOTION = "local:mobile:deviceMotion"
export const M_DEVICE_ORIEN = "local:mobile:deviceOrientation"

export const hasPeer = (values, peer) => {
  let _found = false
  for (let val of values) {
    if (val.id === peer.id) {
      _found = true
      break
    }
  }
  return _found
}

export const findPeer = (values, id) => {
  for (let peer of values) {
    if (peer.id === id) return peer
  }
  return null
}

export const numberDesktops = values => {
  let c = 0
  for (let val of values) {
    if (val.desktop) c++
  }
  return c
}

export const createVideoElFromStream = (
  stream,
  { width = WIDTH, height = HEIGHT } = {}
) => {
  const v = document.createElement("video")
  v.setAttribute("autoplay", true)
  v.width = width
  v.height = height
  v.srcObject = stream
  v.classList.add("canvas")
  return v
}

export const resizeCanvas = (el, w = WIDTH, h = HEIGHT) => {
  let { width, height, x, y } = cover(
    window.innerWidth,
    window.innerHeight,
    w,
    h
  )
  const scale = Math.max(width / w, height / h)
  el.style.transform = `scale3d(${scale},${scale},1) translate3d(0, 0, 0)`
  el.style.webkitTransform = `scale3d(${scale},${scale},1) translate3d(0,0, 0)`
  el.style.top = `${y / 2}px`
  el.style.left = `${x / 2}px`
}


const RED = [
  "background: #f45f42",
  "border: 1px solid #662558",
  "color: #3d3735",
  "display: block",
  "line-height: 30px",
  "text-align: center",
  "font-weight: bold",
].join(";")
const GREEN = [
  "background: #662558",
  "border: 1px solid #662558",
  "color: #42f4aa",
  "display: block",
  "line-height: 30px",
  "text-align: center",
  "font-weight: bold",
].join(";")
const BLOCK = [
  "background: #571402",
  "border: 1px solid #3E0E02",
  "color: white",
  "display: block",
  "text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)",
  "box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset",
  "line-height: 30px",
  "text-align: center",
  "font-weight: bold",
].join(";")
const BLOCK_INFO = [
  "background: #4285f4",
  "text-shadow: 0 1px 0 rgba(0, 0, 0, 0.7)",
  "color: #fbbc05",
  "display: block",
  "line-height: 23px",
  "text-align: center",
  "font-weight: bold",
].join(";")

export const logError = str => console.log(`%c ${str}`, RED)
export const logSuccess = str => console.log(`%c ${str}`, GREEN)
export const logInfoB = str => console.log(`%c ${str}`, BLOCK)
export const logInfo = str => console.log(`%c ${str}`, BLOCK_INFO)