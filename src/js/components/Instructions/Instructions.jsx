import React, { Component } from "react"
import { withRouter, Link } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import {
  compose,
  setDisplayName,
  onlyUpdateForPropTypes,
  withHandlers,
} from "recompose"
import { ROUTES } from "routes"
import { composeElement, Section, Bb } from "UI/UIComponents"
import { setInstructions } from "actions/app"
import { getRoomSlug } from "selectors/webrtc"

const Button = composeElement(["flex"], "button")

class InstructionsComponent extends Component {
  static propTypes = {
    roomSlug: PropTypes.string.isRequired,
    isStarted: PropTypes.bool.isRequired,
    setInstructions: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    if (this.props.isStarted) return null
    return (
      <Section centerBoth="true">
        <Link to={`${ROUTES.feed.base}/${this.props.roomSlug}`}>
          <Button
            onClick={() =>
              this.props.setInstructions({ started: true })
            }
          >
            START
          </Button>
        </Link>
      </Section>
    )
  }
}

const mapStateToProps = () => (state, ownProps) => ({
  roomSlug: getRoomSlug(state),
  isStarted: state.app.get("instructions").started,
  app: state.app,
})

const mapDispatchToProps = (dispatch, props) => ({
  setInstructions: data => dispatch(setInstructions(data)),
})

export default withRouter(
  compose(
    setDisplayName("InstructionsComponent"),
    connect(mapStateToProps, mapDispatchToProps),
    onlyUpdateForPropTypes
  )(InstructionsComponent)
)
