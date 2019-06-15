import { Constants, UserActions, UserState } from "./types"

const initialState: UserState = {
  user: undefined,
  loggedIn: false
}

export function userReducer(
  state: UserState = initialState,
  action: UserActions
): UserState {
  switch (action.type) {
    case Constants.SET_USER_DATA: {
      return {
        ...state,
        user: action.payload.user
      }
    }
    case Constants.SET_LOGIN_STATUS: {
      return {
        ...state,
        loggedIn: action.payload.status
      }
    }
    default:
      return state
  }
}
