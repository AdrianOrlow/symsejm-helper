import * as React from "react"

import "./PartyInfo.scss"
import { db } from "../Firebase"

export enum PartyElementSize {
  SMALL = "small",
  MEDIUM = "medium",
  BIG = "big"
}

interface PartyProps {
  id: string
  size: PartyElementSize
}

interface PartyState {
  img: string
  name: string
}

class PartyInfo extends React.Component<PartyProps, PartyState> {
  state = {
    img: "",
    name: ""
  }

  private getPartyDataFromDatabase(partyId: string) {
    return db.getPartyData(partyId).catch(error => {
      console.error(error)
    })
  }

  componentDidMount() {
    const { id } = this.props

    this.getPartyDataFromDatabase(id).then(partyData => {
      if (partyData) {
        this.setState({
          img: partyData.img,
          name: partyData.name
        })
      }
    })
  }

  public render() {
    const { size } = this.props
    const { name, img } = this.state
    return (
      <div className={`partyinfo partyinfo--${size}`}>
        <img className="partyinfo__img" alt={name} src={img} />
        <span className="partyinfo__name">{name}</span>
      </div>
    )
  }
}

export default PartyInfo
