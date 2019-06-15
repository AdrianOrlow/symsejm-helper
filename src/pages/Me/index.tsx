import * as React from "react"
import { connect } from "react-redux"

import "./Me.scss"
import PartyInfo from "../../components/PartyInfo"
import { PartyElementSize } from "../../components/PartyInfo"
import history from "../../history"
import { RootState } from "../../store"
import { db } from "../../components/Firebase"
const mapStateToProps = ({ user }: RootState) => {
  const { user: userData, loggedIn } = user
  return { userData, loggedIn }
}

type ReduxType = ReturnType<typeof mapStateToProps>

interface MeState {
  partyId: string
  hasMandate: boolean
  isAdmin: boolean
}

class Me extends React.Component<ReduxType, MeState> {
  constructor(props: ReduxType) {
    super(props)

    this.state = {
      partyId: "",
      hasMandate: false,
      isAdmin: false
    }
  }

  private getUserDataFromDatabase(userId: string) {
    return db.getUserData(userId).catch(error => {
      console.error(error)
      history.push("/")
    })
  }

  componentDidMount() {
    const { userData, loggedIn } = this.props

    if (userData && loggedIn) {
      this.getUserDataFromDatabase(userData.id).then(userData => {
        if (userData) {
          this.setState({
            partyId: userData.party.id,
            hasMandate: userData.hasMandate,
            isAdmin: userData.isAdmin
          })
        }
      })
    }
  }

  public render() {
    const { userData, loggedIn } = this.props
    const { partyId, hasMandate, isAdmin } = this.state

    if (!loggedIn || !userData) {
      history.push("/")
    } else {
      return (
        <section className="me">
          <h2 className="me__title">Mój profil</h2>
            <div className="me__content">
              <div className="me__top">
                <img
                  className="me__img"
                  alt={userData.fullname}
                  src={`${userData.img}?width=500&height=500`}
                />
                {isAdmin && <div className="me__admin">Admin</div>}
              </div>
              <div className="me__basic">
                <div className="me__basic__el">
                  <span className="me__basic__title">Imię i nazwisko</span>
                  <span className="me__basic__data--short">
                    {userData.fullname}
                  </span>
                </div>
                {partyId.length > 0 && (
                  <div className="me__basic__el">
                    <span className="me__basic__title">Członek</span>

                    <PartyInfo id={partyId} size={PartyElementSize.MEDIUM} />
                  </div>
                )}
                <div className="me__basic__el">
                  <span className="me__basic__title">Poseł</span>
                  {!hasMandate && (
                    <span className="me__basic__data--short">Brak mandatu</span>
                  )}
                  {hasMandate && (
                    <span className="me__basic__data--short">Ma mandat</span>
                  )}
                </div>
              </div>
            </div>
        </section>
      )
    }
  }
}

export default connect(mapStateToProps)(Me)
