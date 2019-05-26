// @flow
export type Game = {
  gameId: string,
  title: string,
  description: string,
  location: string,
  startTime: string,
  mins: number,
  tags: Array<string>,
  genres: Array<string>,
  styles: Array<string>,
  language: string,
  endTime: string,
  people: string,
  minAttendance: number,
  maxAttendance: number,
  gameSystem: string,
  noLanguage: boolean,
  englishOk: boolean,
  childrenFriendly: boolean,
  ageRestricted: boolean,
  beginnerFriendly: boolean,
  intendedForExperiencedParticipants: boolean,
}

export type GameWithPriority = {
  gameDetails: Game,
  priority: number,
}
