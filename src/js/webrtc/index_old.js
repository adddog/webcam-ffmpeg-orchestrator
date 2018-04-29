import QS from "query-string"
import SimpleWebRTC from "simplewebrtc"

const WebRTC = options => {
  const noCamera = QS.parse(location.search).noc

  const videoSettings = {
    width: { max: WIDTH },
    height: { max: HEIGHT },
    frameRate: { max: FPS },
  }

  const webrtc = new SimpleWebRTC(
    {
      url: IS_DEV ? SERVER_URL : SERVER_URL,
      /*socketio:{
          //path:"/ratp"
        },*/
      nick: {
        desktop: Detector.isDesktop,
        uuid: uuid.v4(),
      },
      autoRemoveVideos: true,
      autoRequestMedia: true,
      localVideoId: "localVideo",
      remoteVideosEl: "remoteVideos",
      media: {
        video: store.useWebcam
          ? Detector.isDesktop
            ? noCamera ? false : { ...videoSettings }
            : noCamera
              ? false
              : {
                  ...videoSettings,
                  facingMode: "environment",
                }
          : false,
        audio: store.useWebcam ? !Detector.isDesktop : false,
      },
      receiveMedia: {
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      },
      offerToReceiveAudio: true,
      offerToReceiveVideo: true,
    },
    { mirror: false }
  )

  webrtc.on("disconnect", function(evt) {
    console.log("Webrtc:disconnect")
    Socket.emit("room:leave")
  })

  webrtc.on("connectionReady", function(evt) {
    logInfo(`connectionReady`)
    if (IS_PROD) {
      Socket.socket = webrtc.connection.connection
    }
  })

  webrtc.on("readyToCall", function() {
    logInfo(`Joining room ${store.room.id}`)
  })

  const leaveRoom = roomId => {
    Socket.emit("room:leave", { roomId: store.room.id })
    webrtc.leaveRoom()
  }

  const joinRoom = roomId => {
    emitter.emit("room:change", roomId)
    Socket.createRoom({ roomId })
    connect()
    webrtc.joinRoom(roomId)
  }

  emitter.on("webrtc:connect", ({ roomId }) => {
    console.log(`webrtc:connect ${roomId}`)
    Socket.emit(
      "rooms:canJoin",
      { roomId, desktop: IS_DESKTOP },
      resp => {
        console.log("---------")
        console.log(resp)
        console.log("---------")
        if (resp.canJoin) {
          Gui.roomDetails = resp
          console.log("Gui.connected", Gui.connect)
          if (Gui.connect) {
            disconnect()
            leaveRoom(roomId)
          }
          connect()
          joinRoom(roomId)
        } else {
          store.errorMsg = `Cannot join room ${roomId}`
          logError(`Cannot join room ${roomId}`)
          setTimeout(() => window.location.reload(), 1000)
        }
      }
    )

    if (Gui.started) return
    Gui.started = true
  })

  return webrtc
}
