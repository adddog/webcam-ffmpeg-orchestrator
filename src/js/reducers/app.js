import * as ACTIONS from "actions/actionTypes"
import { Map } from "immutable"

const initialState = new Map().set("instructions", {
  started: false,
})

export default function app(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.APP_INSTRUCTIONS_SET: {
      return state.set("instructions", {
        ...state.get("instructions"),
        ...action.payload,
      })
    }
    default: {
      return state
    }
  }
}
