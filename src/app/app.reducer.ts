import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as UiReducer from "./shared/ui.reducer";
import * as AuthReducer from "./auth/auth/auth.reducer";

export interface State {
  ui: UiReducer.State,
  auth: AuthReducer.State
}

export const reducers: ActionReducerMap<State> = {
  ui: UiReducer.uiReducer,
  auth: AuthReducer.authReducer
}

const getUiState = createFeatureSelector<UiReducer.State>('ui');
export const getIsLoading = createSelector(getUiState, UiReducer.getIsLoading);

const getAuthState = createFeatureSelector<AuthReducer.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, AuthReducer.getIsAuthenticated);
