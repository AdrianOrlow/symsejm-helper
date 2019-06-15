import { combineReducers, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import { userReducer } from "./user/reducer"
import { UserState } from "./user/types"

export interface RootState {
  user: UserState
}

const persistConfig = {
  key: "root",
  storage
}

const rootReducer = combineReducers({
  user: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, composeWithDevTools())
  let persistor = persistStore(store)
  return { store, persistor }
}
