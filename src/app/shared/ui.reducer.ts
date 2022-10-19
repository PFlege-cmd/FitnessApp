import {UI_START_ACTION, UI_STOP_ACTION} from "./ui.actions";
import {Action} from "@ngrx/store";

export interface State {
  isLoading: boolean
}

const initialState = {
  isLoading: false
}

export function uiReducer(state = initialState, action: Action): State {
  switch(action.type){
    case UI_START_ACTION:
      return {
        isLoading: true
      }
    case UI_STOP_ACTION:
      return {
        isLoading: false
      }
    default:
      return state;
  }
}

export const getIsLoading = (state: State) => state.isLoading;
