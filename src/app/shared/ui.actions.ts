import {Action} from "@ngrx/store";

export const UI_START_ACTION = '[UI] START ACTION';
export const UI_STOP_ACTION = '[UI] STOP ACTION';

export class UiStartAction implements Action {
  readonly type = UI_START_ACTION
}

export class UiStopAction implements Action {
  readonly type = UI_STOP_ACTION
}

export type UiActions = UiStartAction | UiStopAction;
