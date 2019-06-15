import { ActionType } from "typesafe-actions"
import * as actions from "./actions"
export type UserActions = ActionType<typeof actions>

export enum Constants {
  SET_USER_DATA = "SET_USER_DATA",
  SET_LOGIN_STATUS = "SET_LOGIN_STATUS"
}

export interface UserState {
  user?: User
  loggedIn: boolean
}

export interface User {
  id: string
  fullname: string
  img: string
}
