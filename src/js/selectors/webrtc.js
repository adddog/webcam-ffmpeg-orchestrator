export const getRoomSlug = state => state.webrtc.get("room").id
export const getRoomId = state => state.webrtc.get("room").id

export const getWebRTCProps = (state, ownProps = {}) => ({
  /**~~~~**
      to select
  **~~~~**/
  elementIds: {
    outputCanvas: "c_output",
    localVideo: state.webrtc.get("settings").localVideoEl,
    remoteVideo: state.webrtc.get("settings").remoteVideosEl,
  },
  settings: state.webrtc.get("settings"),
  useWebcam: !state.webrtc.get("settings").noVideo,
  room: {
    id: ownProps.roomId || getRoomId(state),
  },
  roomId: ownProps.roomId || getRoomId(state),
})
