import { ActionReducerMap } from '@ngrx/store';

import { appReducer, IAppState } from './app/app.reducer';
import { authReducer, IAuthState } from './auth/auth.reducer';
import * as fromRepos from './repos/repos.reducer';

export interface AppState {
  app: IAppState;
  auth: IAuthState;
  repos: fromRepos.ReposState;
}

export const reducers: ActionReducerMap<AppState> = {
  app: appReducer,
  auth: authReducer,
  repos: fromRepos.reducer,
};

export const defaultState: AppState = {
  app: null,
  auth: null,
  repos: {ids: [] } as fromRepos.ReposState,
};
