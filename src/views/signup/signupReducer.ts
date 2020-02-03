import {
  SUBMIT_SIGNUP_TIME,
  SUBMIT_SELECTED_GAMES,
  UPDATE_UNSAVED_CHANGES_STATUS,
} from 'views/signup/signupActions';
import { SignupState } from 'typings/redux.typings';

// Initial null value is required for syncing signedGames and selectedGames only once
const initialState = {
  signupTime: '',
  selectedGames: [],
  unsavedChanges: false,
};

export const signupReducer = (
  state: SignupState = initialState,
  action: any
) => {
  switch (action.type) {
    case SUBMIT_SIGNUP_TIME:
      return { ...state, signupTime: action.signupTime };
    case SUBMIT_SELECTED_GAMES:
      return { ...state, selectedGames: action.selectedGames };
    case UPDATE_UNSAVED_CHANGES_STATUS:
      return { ...state, unsavedChanges: action.unsavedChanges };
    default:
      return state;
  }
};
