import QS from "query-string"
import { getRoomId } from "selectors/routes"

export const getRouterMatchParams = (state, props) => props.match.params
export const getRoomIdFromMatchParams = (state, props) => props.match.params.roomId || getRoomId(state)
export const getParams = state => QS.parse(state.router.location.search)
