import React from "react"
import ReactDOM from "react-dom"
import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"

import "./normalize.min.css"
import App from "./App/App"
import * as serviceWorker from "./serviceWorker"
import configureStore from "./store"
const { persistor, store } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
)

serviceWorker.register()
