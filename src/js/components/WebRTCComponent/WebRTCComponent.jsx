import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  compose,
  setDisplayName,
  onlyUpdateForPropTypes,
  withHandlers,
} from "recompose"
import styled from "styled-components"
import { composeElement } from "UI/UIComponents"
import { Main } from "UI/UIComponents"

import { getWebRTCProps } from "selectors/webrtc"

export const CanvasContainer = composeElement(
  ["abs", "abs--tl", "full"],
  "div"
)

export const Canvas = styled.canvas`
    backface-visibility: hidden
    perspective: 1
    transform-origin: 0% 0%
    transform: scale3d(1,1,1)
`

export const VideoEl = composeElement(
  ["abs", "abs--tl", "full"],
  "video"
)

import WebRTC from "webrtc"

class WebRTCComponent extends Component {
  static propTypes = {
    roomId: PropTypes.string.isRequired,
    webRTCProps: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.webrtc = new WebRTC(this.props.webRTCProps)
  }

  componentDidUpdate() {}

  render() {
    return (
      <Main>
        <VideoEl
          id={this.props.webRTCProps.elementIds.localVideo}
          playsInline
          autoPlay
        />
        <div id={this.props.webRTCProps.elementIds.remoteVideo} />
        <CanvasContainer>
          <Canvas
            id={this.props.webRTCProps.elementIds.outputCanvas}
          />
        </CanvasContainer>
      </Main>
    )
  }
}

const mapStateToProps = () => (state, ownProps) => ({
  isStarted: state.app.get("instructions").started,
  webRTCProps: getWebRTCProps(state, ownProps),
})

const mapDispatchToProps = (dispatch, props) => ({})

export default compose(
  setDisplayName("WebRTCComponent"),
  connect(mapStateToProps, mapDispatchToProps),
  onlyUpdateForPropTypes
)(WebRTCComponent)
