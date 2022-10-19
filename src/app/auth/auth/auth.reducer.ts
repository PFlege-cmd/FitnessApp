import { AUTH_SET_AUTHETICATED, AUTH_SET_UNAUTHETICATED } from "./auth.actions";
import {Action} from "@ngrx/store";

export interface State {
  isAuthenticated: boolean
}

const initialState = {
  isAuthenticated: false
}

export function authReducer(state = initialState, action: Action): State {
  switch(action.type){
    case AUTH_SET_AUTHETICATED:
      return {
        isAuthenticated: true
      }
    case AUTH_SET_UNAUTHETICATED:
      return {
        isAuthenticated: false
      }
    default:
      return state;
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
