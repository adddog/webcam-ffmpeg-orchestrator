import { injectGlobal } from 'styled-components'
import reset from 'styled-reset'

const baseStyles = () => injectGlobal`
  ${reset}
  body {
    position: relative;
    font-family: 'montserrat-light', 'Helvetica', 'Arial', sans-serif;
    font-size: 16px;
    color: #333;
    background-color: #b3b3b3;
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    min-width: 100vw;
    height: 100vh;
    width: 100vw;
}

#app,
.main{
    position: relative;
    width: 100%;
    height: 100%;
}

select,
textarea,
input-placeholder {
    color: rgb(110, 110, 110);
}

input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
}

button:focus {
    outline: 0 !important;
}

button {
}

* {
    font-family: 'montserrat-light', 'Helvetica', 'Arial', sans-serif;
    box-sizing: border-box;
}
`

export default baseStyles
