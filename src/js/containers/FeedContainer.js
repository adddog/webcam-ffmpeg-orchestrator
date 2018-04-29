import React from "react"
import {
    compose,
    setDisplayName,
    onlyUpdateForPropTypes,
    withHandlers,
} from "recompose"
import { connect } from "react-redux"
import { find, omit } from "lodash"
import { withRouter } from "react-router-dom"

import FeedComponent from "components/FeedComponent/FeedComponent"

const mapStateToProps = () => (state, ownProps) => ({
    routes: state.routes,
})

const mapDispatchToProps = (dispatch, props) => ({
})


export default withRouter(
    compose(
        setDisplayName("FeedComponent"),
        withHandlers({}),
        connect(mapStateToProps, mapDispatchToProps),
        onlyUpdateForPropTypes
    )(FeedComponent)
)
