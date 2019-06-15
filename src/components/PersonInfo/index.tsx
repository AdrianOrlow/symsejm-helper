import * as React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faUserTie } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"

import "./PersonInfo.scss"
import { db } from "../Firebase"

library.add(faUserTie)

export interface Person {
  id: string
  isLeader: boolean
}

class PersonInfo extends React.Component<Person> {
  state = {
    img: "",
    name: "",
    hasMandate: null
  }

  private getUserDataFromDatabase(userId: string) {
    return db.getUserData(userId).catch(error => console.error(error))
  }

  componentDidMount() {
    const { id } = this.props

    this.getUserDataFromDatabase(id).then(userData => {
      if (userData) {
        this.setState({
          img: userData.img,
          name: userData.name,
          hasMandate: userData.hasMandate
        })
      } else {
        throw new Error("No user data")
      }
    })
  }

  public render() {
    const { img, name, hasMandate } = this.state
    const { isLeader } = this.props

    return (
      <div className={`person ${isLeader ? "person--gold" : ""}`}>
        <img
          className="person__img"
          title="Zdjęcie użytkownika"
          alt={name}
          src={img}
        />
        <span className="person__name">{name}</span>
        {hasMandate && (
          <span className="person__icon" title="Posiada mandat poselski">
            <FaIcon icon={faUserTie} />
          </span>
        )}
      </div>
    )
  }
}

export default PersonInfo
