import {
  logError,
  logInfo,
  logSuccess,
  findPeer,
} from "common/constants"

const Mobile = (webrtc, state, emitter) => {
  const peers = new Set()

  const videoEl = document.getElementById("localVideo")
  videoEl.style.display = "none"

  const remoteVideoEl = document.getElementById("remoteVideos")
  remoteVideoEl.style.display = "none"

  const send = (msg, payload) => webrtc.sendToAll(msg, payload)
  const sendChannel = (msg, payload) =>
    webrtc.sendDirectlyToAll(state.room.id, msg, payload)

  function addListeners() {
    webrtc.on("leftRoom", roomId => {
      console.log("Left the room")
    })

    webrtc.on("peerRemoved", peer => {
      console.log(`${peer.id} left`)
      peers.delete(peer)
    })

    webrtc.connection.on("message", function(data) {
      switch (data.type) {
        case "local:desktop:handshake": {
        }
      }
    })

    webrtc.on("videoAdded", (video, peer) => {})

    webrtc.on("createdPeer", peer => {
      console.log("Found peer!")
      peers.add(peer)
      send("local:mobile:hello", {
        id: peer.id,
      })
    })
  }

  addListeners()

  return {}
}

export default Mobile
