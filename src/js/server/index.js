import "whatwg-fetch"
import fetchJsonp from "fetch-jsonp"
import { IS_DEV, WIDTH, SERVER_URL } from "common/constants"

const PATH =
  process.env.NODE_ENV === "development" ? "" : "feedback-rtc/"

const Server = dispatch => {
  function upload(blob) {
    var formData = new FormData()
    formData.append("video", blob)

    return fetch(`${SERVER_URL}${PATH}upload`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: formData,
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson)
        return responseJson
      })
  }

  window.instagramCallback = data => data

  const DEFAULT_ENDPOINT = "users"
  const DEFAULT_ORIGIN = "https://api.instagram.com"
  const DEFAULT_SIZE = 100
  const DEFAULT_VERSION = "v1"

  function roomId() {
    return fetch(`${SERVER_URL}${PATH}room`, {}).then(response =>
      response.json()
    )
  }

  return {
    roomId,
    upload,
  }
}

export default Server
