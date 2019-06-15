import * as React from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faFacebookF } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"

import "./LoginButton.scss"
import { auth } from "../Firebase"
import * as actions from "../../store/user/actions"
import { UserActions, User } from "../../store/user/types"

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
  return {
    setLoginStatus: (status: boolean) =>
      dispatch(actions.setLoginStatus(status)),
    setUserData: (userData: User) => dispatch(actions.setUserData(userData))
  }
}

library.add(faFacebookF)

type ReduxType = ReturnType<typeof mapDispatcherToProps>

interface LoginButtonState {
  loading: boolean
}

class LoginButton extends React.Component<ReduxType, LoginButtonState> {
  constructor(props: any) {
    super(props)

    this.state = {
      loading: false
    }

    this.onSubmit = this.onSubmit.bind(this)
  }

  private onSubmit(event: any) {
    const { setLoginStatus, setUserData } = this.props

    this.setState({ loading: true })

    auth
      .signInWithFacebook()
      .then(user => user.user)
      .then(user => {
        if (user) {
          const userId = user.uid
          const userFullName = user.displayName || ""
          const userImg = user.photoURL || ""

          const userData: User = {
            id: userId,
            fullname: userFullName,
            img: userImg
          }

          setUserData(userData)
          setLoginStatus(true)
        }
      })
      .catch(error => {
        console.error(new Error(error))
      })
      .finally(() => this.setState({ loading: false }))

    event.preventDefault()
  }

  public render() {
    const { loading } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        {!loading && (
          <button className="loginbutton">
            <FaIcon className="loginbutton__icon" icon={faFacebookF} />

            <span className="loginbutton__title">Zaloguj się</span>
          </button>
        )}
        {loading && (
          <button className="loginbutton" disabled>
            <span className="loginbutton__title">Ładowanie...</span>
          </button>
        )}
      </form>
    )
  }
}

export default connect(
  null,
  mapDispatcherToProps
)(LoginButton)
