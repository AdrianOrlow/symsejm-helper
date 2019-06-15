import * as React from "react"

import "./ClubInfo.scss"
import { db } from "../Firebase"

export enum ClubElementSize {
  SMALL = "small",
  MEDIUM = "medium",
  BIG = "big"
}

interface ClubProps {
  id: string
  size: ClubElementSize
}

interface ClubState {
  img: string
  name: string
}

class ClubInfo extends React.Component<ClubProps, ClubState> {
  state = {
    img: "",
    name: ""
  }

  private getClubDataFromDatabase(clubId: string) {
    return db.getClubData(clubId).catch(error => {
      console.error(error)
    })
  }

  componentDidMount() {
    const { id } = this.props

    this.getClubDataFromDatabase(id).then(clubData => {
      if (clubData) {
        this.setState({
          img: clubData.img,
          name: clubData.name
        })
      }
    })
  }

  public render() {
    const { size } = this.props
    const { name, img } = this.state
    return (
      <div className={`clubinfo clubinfo--${size}`}>
        <img className="clubinfo__img" alt={name} src={img} />
        <span className="clubinfo__name">{name}</span>
      </div>
    )
  }
}

export default ClubInfo
