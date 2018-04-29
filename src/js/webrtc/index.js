import io from "socket.io-client"
import SimpleWebRTC from "simplewebrtc"
import Emitter from "common/emitter"
import { SERVER_URL, IS_DEV, IS_PROD } from "common/constants"
import { connect, disconnect } from "webrtc/model"
import Socket from "server/socket"
import Desktop from "webrtc/desktop"
import Mobile from "webrtc/mobile"

export default class WebRTC {
  constructor(props) {
    this.props = props
    if (IS_DEV) {
      Socket.socket = io(SERVER_URL)
    }
    Socket.emitter = Emitter

    const { settings, roomId } = props

    const videoSettings = {
      width: { max: settings.width },
      height: { max: settings.height },
      frameRate: { max: settings.fps },
    }

    this.webrtc = new SimpleWebRTC(
      {
        url: settings.serverUrl,
        nick: {
          uuid: settings.uuid,
        },
        ...settings,
        media: {
          video: settings.noVideo ? false : { ...videoSettings },
          audio: !settings.noAudio,
        },
      },
      { mirror: false }
    )

    this.webrtc.on("connectionReady", evt => {
      if (IS_PROD) {
        Socket.socket = webrtc.connection.connection
      }
    })

    //this.webrtc.on("disconnect", evt => {})

    this.webrtc.on("readyToCall", () => {
      Socket.createRoom({ roomId })
      this.webrtc.joinRoom(roomId)
      this.start()
    })

    /*
    this.webrtc.on("createdPeer", peer => {})

    this.webrtc.on("handlePeerStreamAdded", peer => {})

    this.webrtc.on("leftRoom", roomId => {
      console.log(roomId)
    })

    this.webrtc.on("peerRemoved", peer => {})

    this.webrtc.on("videoRemoved", (videoEl, peer) => {})

    this.webrtc.on("localScreenAdded", el => {
      console.log(el)
    })
    this.webrtc.on("videoAdded", (video, peer) => {})*/
  }

  start() {
    this.app = Detector.isMobile
      ? new Mobile(this.webrtc, this.props, Emitter)
      : new Desktop(this.webrtc, this.props, Emitter)
    connect()
  }
}
