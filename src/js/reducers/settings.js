import * as ACTIONS from "actions/actionTypes"
import { Map } from "immutable"

const initialState = new Map()

export default function settings(state = initialState, action) {
  switch (action.type) {
    default: {
      return state
    }
  }
}
