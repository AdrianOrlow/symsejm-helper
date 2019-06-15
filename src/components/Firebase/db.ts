import { db } from "./firebase"

// User API

export const getUserData = (userId: string) =>
  db
    .collection("users")
    .doc(userId)
    .get()
    .then(user => {
      if (!user.exists) {
        throw new Error("User does not exists")
      } else {
        return user.data()
      }
    })

// Party API

export const getPartiesIds = () =>
  db
    .collection("parties")
    .get()
    .then(data => data.docs)
    .then(docs => docs.map(doc => doc.id))

export const getPartyData = (partyId: string) =>
  db
    .collection("parties")
    .doc(partyId)
    .get()
    .then(party => {
      if (!party.exists) {
        throw new Error("Party does not exists")
      } else {
        return party.data()
      }
    })

export const getPartyMembersIds = (partyId: string) => {
  const partyReference = db.collection("parties").doc(partyId)

  return db
    .collection("users")
    .where("party", "==", partyReference)
    .get()
    .then(data => data.docs)
    .then(docs => docs.map(doc => doc.id))
}

export const getPartyLeadersIds = (partyId: string) =>
  db
    .collection("parties")
    .doc(partyId)
    .collection("leaders")
    .get()
    .then(data => data.docs)
    .then(docs => docs.map(doc => doc.id))

// Clubs API

export const getClubsIds = () =>
  db
    .collection("clubs")
    .get()
    .then(data => data.docs)
    .then(docs => docs.map(doc => doc.id))

export const getClubData = (clubId: string) =>
  db
    .collection("clubs")
    .doc(clubId)
    .get()
    .then(club => {
      if (!club.exists) {
        throw new Error("Club does not exists")
      } else {
        return club.data()
      }
    })

export const getClubMembersIds = (clubId: string) => {
  const clubReference = db.collection("clubs").doc(clubId)

  return db
    .collection("users")
    .where("club", "==", clubReference)
    .get()
    .then(data => data.docs)
    .then(docs => docs.map(doc => doc.id))
}

export const getClubLeadersIds = (clubId: string) =>
  db
    .collection("clubs")
    .doc(clubId)
    .collection("leaders")
    .get()
    .then(data => data.docs)
    .then(docs => docs.map(doc => doc.id))
