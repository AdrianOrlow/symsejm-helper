import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faUser,
  faVoteYea,
  faBullhorn,
  faUsers,
  faUsersCog,
  faCalendar,
  faFile,
  faComments
} from "@fortawesome/free-solid-svg-icons"
library.add(
  faUser,
  faVoteYea,
  faBullhorn,
  faUsers,
  faCalendar,
  faFile,
  faComments
)

export interface NavElements {
  elements: NavPage[]
}

export interface NavPage {
  name: string
  icon: IconProp
  path: string
}

export const navElements: NavElements = {
  elements: [
    {
      name: "Posiedzenia",
      icon: faComments,
      path: "/sittings"
    },
    {
      name: "Kancelaria",
      icon: faFile,
      path: "/chancellery"
    },
    {
      name: "Wykaz poselski",
      icon: faUsersCog,
      path: "/mps"
    },
    {
      name: "Wydarzenia",
      icon: faCalendar,
      path: "/events"
    },
    {
      name: "Partie",
      icon: faUsers,
      path: "/parties"
    },
    {
      name: "Media",
      icon: faBullhorn,
      path: "/media"
    },
    {
      name: "Wybory",
      icon: faVoteYea,
      path: "/elections"
    }
  ]
}
