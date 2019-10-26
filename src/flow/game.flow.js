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
  +englishOk: boolean,
  +childrenFriendly: boolean,
  +ageRestricted: boolean,
  +beginnerFriendly: boolean,
  +intendedForExperiencedParticipants: boolean,
  +shortDescription: string,
  +revolvingDoor: boolean,
  +popularity: number,
|};

export type DnDUpdatedPositions = {|
  +availableGames?: $ReadOnlyArray<Game>,
  +selectedGames?: $ReadOnlyArray<Game>,
|};

export type DnDMove = {|
  +index: number,
  +droppableId: string,
|};
