// @flow

export type Game = {|
  +gameId: string,
  +title: string,
  +description: string,
  +location: string,
  +startTime: string,
  +mins: number,
  +tags: $ReadOnlyArray<string>,
  +genres: $ReadOnlyArray<string>,
  +styles: $ReadOnlyArray<string>,
  +language: string,
  +endTime: string,
  +people: string,
  +minAttendance: number,
  +maxAttendance: number,
  +gameSystem: string,
  +noLanguage: boolean,
  +englishOk: boolean,
  +childrenFriendly: boolean,
  +ageRestricted: boolean,
  +beginnerFriendly: boolean,
  +intendedForExperiencedParticipants: boolean,
|}

export type UpdatedPositions = {|
  +availableGames?: $ReadOnlyArray<Game>,
  +selectedGames?: $ReadOnlyArray<Game>,
|}
