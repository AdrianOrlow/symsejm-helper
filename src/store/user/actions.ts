import { action } from "typesafe-actions"
import { Constants, User } from "./types"

export function setUserData(user: User) {
  return action(Constants.SET_USER_DATA, {
    user
  })
}

export function setLoginStatus(status: boolean) {
  return action(Constants.SET_LOGIN_STATUS, {
    status
  })
}
