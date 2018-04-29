import "babel-polyfill"
window.Modernizr = window.Modernizr || {}
import "whatwg-fetch"
import baseStyles from 'styles'

import { REQUEST_PREMIERE_CHILDREN } from "actions/actionTypes"

import Detector from "common/detector"
import Server from "server"
import { logGreen } from "common/log"
import { throttle } from "lodash"
import React from "react"
import ReactDOM from "react-dom"

import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from "react-redux"

import { createBrowserHistory } from "history"
import { ConnectedRouter } from "connected-react-router/immutable"

import { calculateResponsiveState } from "redux-responsive"

import configureStore from "store/configureStore"
import configureRoutes from "routes"
import { Router } from "react-router-dom"

const browserHistory = createBrowserHistory()

const store = configureStore({
  browserHistory,
})

const throttleResize = throttle(() => {
  store.dispatch(calculateResponsiveState(window))
}, 400)

window.addEventListener("resize", () => throttleResize())

const server = new Server(store.dispatch)

const render = () => {
  baseStyles()
  return (
    <Provider store={store}>
      <ConnectedRouter history={browserHistory}>
        {configureRoutes()}
      </ConnectedRouter>
    </Provider>
  )
}

ReactDOM.render(
  render(),
  document.getElementById("app")
)

logGreen(`process.env.DEV ${process.env.DEV}`)
