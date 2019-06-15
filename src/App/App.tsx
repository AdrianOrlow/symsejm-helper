import * as React from "react"
import { Router, Route, Switch, Link, NavLink } from "react-router-dom"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon as FaIcon } from "@fortawesome/react-fontawesome"

import "./App.scss"
import { navElements } from "./AppNavElements"
import UserInfo from "../components/UserInfo"
import history from "../history"

import Me from "../pages/Me"
import Parties from "../pages/Parties"
import Mps from "../pages/Mps"

library.add(faBars)

class App extends React.Component {
  constructor(props: any) {
    super(props)

    this.toggleNav = this.toggleNav.bind(this)
  }

  state = {
    showNav: false
  }

  private toggleNav() {
    this.setState({
      showNav: !this.state.showNav
    })
  }

  public render() {
    const toggleNav = this.toggleNav
    const { showNav } = this.state
    return (
      <div className="app">
        <Router history={history}>
          <div className={`app__content ${showNav ? "nav-showed" : ""}`}>
            {showNav && (
              <div className="app__nav__user">
                <UserInfo />
              </div>
            )}
            {showNav && (
              <nav className="app__nav__titles">
                <div className="app__nav__column">
                  {navElements.elements.map((navEl, index) => (
                    <NavLink
                      key={index}
                      to={navEl.path}
                      exact
                      activeClassName="active"
                      className="app__nav__title"
                    >
                      {navEl.name}
                    </NavLink>
                  ))}
                </div>
              </nav>
            )}
            <button
              className="app__nav__icon app__nav__icon--main"
              onClick={toggleNav}
            >
              <FaIcon icon={faBars} />
            </button>
            <nav className={`app__nav__icons ${showNav ? "active" : ""}`}>
              <div className="app__nav__column">
                {navElements.elements.map((navEl, index) => (
                  <NavLink
                    key={index}
                    to={navEl.path}
                    activeClassName="active"
                    className="app__nav__icon app__nav__icon--grey"
                  >
                    <FaIcon icon={navEl.icon} />
                  </NavLink>
                ))}
              </div>
            </nav>
            <header className="app__header">
              <Link className="app__header__logo" to="/">
                SymSejm Helper
              </Link>
            </header>
            <main className="app__main">
              <Switch>
                <Route exact path="/Me" component={Me} />
                <Route exact path="/Parties" component={Parties} />
                <Route exact path="/Mps" component={Mps} />
              </Switch>
            </main>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
