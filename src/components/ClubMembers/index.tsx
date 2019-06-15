import * as React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"

import "./ClubMembers.scss"
import PersonInfo from "../PersonInfo"
import { Person } from "../PersonInfo"
import { db } from "../Firebase"
library.add(faChevronUp, faChevronDown)

interface ClubMembersProps {
  id: string
}

interface ClubMembersState {
  members: Person[]
  showMembers: boolean
  isLoading: boolean
}

class ClubMembers extends React.Component<ClubMembersProps, ClubMembersState> {
  constructor(props: ClubMembersProps) {
    super(props)

    this.state = {
      members: [],
      showMembers: false,
      isLoading: false
    }

    this.loadMembers = this.loadMembers.bind(this)
    this.toggleMembers = this.toggleMembers.bind(this)
  }

  private getClubMembersIdsFromDatabase(clubId: string) {
    return db.getClubMembersIds(clubId).catch(error => {
      console.error(error)
    })
  }

  private getClubLeadersIdsFromDatabase(clubId: string) {
    return db.getClubLeadersIds(clubId).catch(error => {
      console.error(error)
    })
  }

  private async loadMembers() {
    const { id } = this.props
    let clubMembers: Person[] = []

    const members = await this.getClubMembersIdsFromDatabase(id)
    const leaders = await this.getClubLeadersIdsFromDatabase(id)

    if (members && leaders) {
      members.forEach(member => {
        clubMembers.push({
          id: member,
          isLeader: leaders.includes(member)
        })
      })

      clubMembers = clubMembers.sort((a, b) =>
        a.isLeader < b.isLeader ? 1 : -1
      )

      this.setState({
        members: clubMembers
      })
    }
  }

  private toggleMembers(event: any) {
    const { showMembers } = this.state

    if (showMembers) {
      this.setState({ showMembers: false })
    } else {
      this.loadMembers().then(() => this.setState({ showMembers: true }))
    }

    event.preventDefault()
  }

  public render() {
    const { members, showMembers } = this.state
    const numberOfSeats = 480
    const percentage = (members.length / numberOfSeats).toFixed(2)
    return (
      <div className="clubmembers">
        <div className="clubmembers__top">
          <div className="clubmembers__title">Członkowie</div>
          {members.length > 0 && (
            <div className="clubmembers__number">
              {members.length} ({percentage}%)
            </div>
          )}
          <button className="clubmembers__button" onClick={this.toggleMembers}>
            {!showMembers && <FaIcon icon={faChevronDown} />}
            {showMembers && <FaIcon icon={faChevronUp} />}
          </button>
        </div>
        {showMembers && (
          <div className="clubmembers__content">
            {members.map((person, index) => {
              return (
                <div className="clubmembers__element" key={index}>
                  <PersonInfo id={person.id} isLeader={person.isLeader} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  }
}

export default ClubMembers
