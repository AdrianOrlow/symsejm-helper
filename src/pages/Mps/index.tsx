import * as React from "react"

import "./Mps.scss"
import Club from "../../components/Club"
import { db } from "../../components/Firebase"

class Mps extends React.Component {
  state = {
    clubsIds: []
  }

  componentDidMount() {
    db.getClubsIds().then(ids => {
      this.setState({
        clubsIds: ids
      })
    })
  }

  public render() {
    const { clubsIds } = this.state
    return (
      <section className="mps">
        <h2 className="mps__title">Wykaz poselski</h2>

        <div className="mps__content">
          <div className="mps__parties">
            {clubsIds.map((clubId, index) => {
              return <Club key={index} id={clubId} />
            })}
          </div>
        </div>
      </section>
    )
  }
}

export default Mps
