import * as React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faBullhorn,
  faGlobe,
  faFileAlt
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"

import "./Party.scss"
import PartyMembers from "../PartyMembers"
import PartyInfo from "../PartyInfo"
import { PartyElementSize } from "../PartyInfo"
import { db } from "../Firebase"

library.add(faBullhorn, faGlobe, faFileAlt)

interface PartyProps {
  id: string
}

interface PartyState {
  isLoading: boolean
  program: string
  statute: string
  site: string
}

class Party extends React.Component<PartyProps, PartyState> {
  state = {
    isLoading: true,
    program: "",
    statute: "",
    site: ""
  }

  componentDidMount() {
    const { id } = this.props

    db.getPartyData(id)
      .then(partyData => {
        if (partyData) {
          this.setState({
            program: partyData.program,
            statute: partyData.statute,
            site: partyData.site
          })
        } else {
          throw new Error("No party data")
        }
      })
      .catch(error => console.error(error))
      .finally(() => this.setState({ isLoading: false }))
  }

  public render() {
    const { id } = this.props
    const { isLoading, program, statute, site } = this.state

    return (
      !isLoading && (
        <div className="party">
          <PartyInfo id={id} size={PartyElementSize.BIG} />
          <div className="party__links">
            <a
              className="party__link"
              target="_blank"
              rel="noopener noreferrer"
              href={program}
            >
              <span className="party__link__icon">
                <FaIcon icon={faBullhorn} />
              </span>
              <span className="party__link__title">Program</span>
            </a>
            <a
              className="party__link"
              target="_blank"
              rel="noopener noreferrer"
              href={statute}
            >
              <span className="party__link__icon">
                <FaIcon icon={faFileAlt} />
              </span>
              <span className="party__link__title">Statut</span>
            </a>
            <a
              className="party__link"
              target="_blank"
              rel="noopener noreferrer"
              href={site}
            >
              <span className="party__link__icon">
                <FaIcon icon={faGlobe} />
              </span>
              <span className="party__link__title">Strona</span>
            </a>
          </div>
          <PartyMembers id={id} />
        </div>
      )
    )
  }
}

export default Party
