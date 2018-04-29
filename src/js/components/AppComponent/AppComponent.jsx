import React, { Component } from "react"
import PropTypes from "prop-types"
import { isUndefined } from "lodash"
import { debounce, autobind } from "core-decorators"
import { Main } from "UI/UIComponents"

import InstructionsComponent from "components/Instructions/Instructions"

import WebRTC from "webrtc"

export default class AppComponent extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // this.webrtx = new WebRTC({})
  }

  componentDidUpdate() {}

  render() {
    return (
      <Main>
        <InstructionsComponent />
      </Main>
    )
  }
}
