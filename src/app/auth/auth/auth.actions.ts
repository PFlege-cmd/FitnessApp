
import {Action} from "@ngrx/store";

export const AUTH_SET_AUTHETICATED = '[AUTH] SET AUTHENTICATED';
export const AUTH_SET_UNAUTHETICATED = '[AUTH] SET UNAUTHENTICATED';

export class SetAuthAction implements Action {
  readonly type = AUTH_SET_AUTHETICATED
}

export class SetUnauthAction implements Action {
  readonly type = AUTH_SET_UNAUTHETICATED
}

export type AuthActions = SetAuthAction | SetUnauthAction;
