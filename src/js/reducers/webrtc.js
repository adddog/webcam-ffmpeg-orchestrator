import * as ACTIONS from "actions/actionTypes"
import { SERVER_URL } from "common/constants"
import { Map } from "immutable"

const initialState = new Map()
  .set("settings", {
    serverUrl: SERVER_URL,
    localVideoEl:'localVideo',
    remoteVideosEl:'remoteVideo',
    width: 640,
    height: 480,
    frameRate: 480,
    noVideo: false,
    noAudio: true,
    autoRemoveVideos: true,
    autoRequestMedia: true,
    receiveMedia: {
      offerToReceiveAudio: false,
      offerToReceiveVideo: true,
    },
  })
  .set("room", {
    id: "sam",
  })

export default function webrtc(state = initialState, action) {
  switch (action.type) {
    default: {
      return state
    }
  }
}
