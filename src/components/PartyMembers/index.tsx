import * as React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"

import "./PartyMembers.scss"
import PersonInfo from "../PersonInfo"
import { Person } from "../PersonInfo"
import { db } from "../Firebase"
library.add(faChevronUp, faChevronDown)

interface PartyMembersProps {
  id: string
}

interface PartyMembersState {
  members: Person[]
  showMembers: boolean
  isLoading: boolean
}

class PartyMembers extends React.Component<
  PartyMembersProps,
  PartyMembersState
> {
  constructor(props: PartyMembersProps) {
    super(props)

    this.state = {
      members: [],
      showMembers: false,
      isLoading: false
    }

    this.loadMembers = this.loadMembers.bind(this)
    this.toggleMembers = this.toggleMembers.bind(this)
  }

  private getPartyMembersIdsFromDatabase(partyId: string) {
    return db.getPartyMembersIds(partyId).catch(error => {
      console.error(error)
    })
  }

  private getPartyLeadersIdsFromDatabase(partyId: string) {
    return db.getPartyLeadersIds(partyId).catch(error => {
      console.error(error)
    })
  }

  private async loadMembers() {
    const { id } = this.props
    let partyMembers: Person[] = []

    const members = await this.getPartyMembersIdsFromDatabase(id)
    const leaders = await this.getPartyLeadersIdsFromDatabase(id)

    if (members && leaders) {
      members.forEach(member => {
        partyMembers.push({
          id: member,
          isLeader: leaders.includes(member)
        })
      })

      partyMembers = partyMembers.sort((a, b) =>
        a.isLeader < b.isLeader ? 1 : -1
      )

      this.setState({
        members: partyMembers
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
    return (
      <div className="partymembers">
        <div className="partymembers__top">
          <div className="partymembers__title">Członkowie</div>
          {members.length > 0 && (
            <div className="partymembers__number">{members.length}</div>
          )}
          <button className="partymembers__button" onClick={this.toggleMembers}>
            {!showMembers && <FaIcon icon={faChevronDown} />}
            {showMembers && <FaIcon icon={faChevronUp} />}
          </button>
        </div>
        {showMembers && (
          <div className="partymembers__content">
            {members.map((person, index) => {
              return (
                <div className="partymembers__element" key={index}>
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

export default PartyMembers
