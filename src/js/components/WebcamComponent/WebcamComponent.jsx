import React, { Component } from "react"
import PropTypes from "prop-types"
import { isUndefined } from "lodash"
import { debounce, autobind } from "core-decorators"
import classnames from "classnames"

import styles from "./AppComponent.css"

export default class AppComponent extends Component {
  static propTypes = {
    //actions
    getProjectChildren: PropTypes.func.isRequired,
    getProjectFileMetadatas: PropTypes.func.isRequired,
    queryChanged: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getProjectChildren()
  }

  componentDidUpdate() {}

  @autobind
  _handleChange(v) {
    this.props.queryChanged(v.target.value)
  }

  render() {
    return (
      <main className={classnames(styles.root)}>

      </main>
    )
  }
}
