import * as React from "react"

import ClubMembers from "../ClubMembers"
import ClubInfo from "../ClubInfo"
import { ClubElementSize } from "../ClubInfo"

interface ClubProps {
  id: string
}

class Club extends React.Component<ClubProps> {
  public render() {
    const { id } = this.props

    return (
      <div className="club">
        <ClubInfo id={id} size={ClubElementSize.BIG} />
        <ClubMembers id={id} />
      </div>
    )
  }
}

export default Club
