import * as React from "react"
import { Dispatch } from "redux"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"

import "./UserInfo.scss"
import LoginButton from "../LoginButton"
import { RootState } from "../../store"
import { auth } from "../Firebase"
import * as actions from "../../store/user/actions"
import { UserActions } from "../../store/user/types"

const mapDispatcherToProps = (dispatch: Dispatch<UserActions>) => {
  return {
    setLoginStatus: (status: boolean) =>
      dispatch(actions.setLoginStatus(status))
  }
}

const mapStateToProps = ({ user }: RootState) => {
  const { user: userData, loggedIn } = user
  return { userData, loggedIn }
}

library.add(faChevronUp, faChevronDown)

type ReduxType = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatcherToProps>

class UserInfo extends React.Component<ReduxType, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      showNav: false
    }

    this.toggleNav = this.toggleNav.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  private toggleNav() {
    this.setState({
      showNav: !this.state.showNav
    })
  }

  private signOut() {
    const { setLoginStatus } = this.props

    auth.signOut()
    setLoginStatus(false)
  }

  public render() {
    const { showNav } = this.state
    const { userData, loggedIn } = this.props
    return (
      <div className="userInfo-container">
        {!loggedIn && <LoginButton />}
        {loggedIn && userData && (
          <div className="userInfo">
            <img
              className="userInfo__img"
              alt={userData.fullname}
              src={userData.img}
            />
            <span className="userInfo__name">{userData.fullname}</span>
            <button className="userInfo__btn" onClick={this.toggleNav}>
              {!showNav && <FaIcon icon={faChevronDown} />}
              {showNav && <FaIcon icon={faChevronUp} />}
            </button>
          </div>
        )}
        {showNav && loggedIn && (
          <div className="userInfo__nav">
            <Link
              className="userInfo__nav__el"
              to="/me"
              onClick={this.toggleNav}
            >
              Mój profil
            </Link>
            <button className="userInfo__nav__el" onClick={this.signOut}>
              Wyloguj się
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatcherToProps
)(UserInfo)
