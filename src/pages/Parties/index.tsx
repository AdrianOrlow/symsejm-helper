import * as React from "react"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"

import "./Parties.scss"
import Party from "../../components/Party"
import { db } from "../../components/Firebase"

library.add(faPlus)

class Parties extends React.Component {
  state = {
    partiesIds: []
  }

  componentDidMount() {
    db.getPartiesIds().then(ids => {
      this.setState({
        partiesIds: ids
      })
    })
  }

  public render() {
    const { partiesIds } = this.state
    return (
      <section className="parties">
        <div className="parties__top">
          <h2 className="parties__title">Partie</h2>
          <button className="parties__button">
            <span className="parties__button__icon">
              <FaIcon icon={faPlus} />
            </span>
            <span className="parties__button__text">Utwórz</span>
          </button>
        </div>

        <div className="parties__content">
          <div className="parties__list">
            {partiesIds.map((partyId, index) => {
              return <Party key={index} id={partyId} />
            })}
          </div>
        </div>
      </section>
    )
  }
}

export default Parties
