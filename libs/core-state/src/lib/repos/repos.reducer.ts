import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import * as reposActions from './repos.actions';
import { Repo } from '@hub/core-data';

export const REPOS_FEATURE_KEY = 'repos';

export interface ReposState extends EntityState<Repo> {
  selectedRepoId?: string | number;
  isLoading: boolean;
}

export interface ReposPartialState {
  readonly [REPOS_FEATURE_KEY]: ReposState;
}

export const reposAdapter: EntityAdapter<Repo> = createEntityAdapter<Repo>();

export const initialState: ReposState = reposAdapter.getInitialState({
  selectedRepoId: null,
  isLoading: false
});

const reposReducer = createReducer(
  initialState,
  on(reposActions.repoSelected, (state, { selectedRepoId }) =>
    Object.assign({}, state, { selectedRepoId })
  ),
  on(reposActions.reposLoaded, (state, { repos }) =>
    reposAdapter.addAll(repos, { ...state, isLoading: false })
  ),
  on(reposActions.repoCreated, (state, { repo }) =>
    reposAdapter.addOne(repo, { ...state, isLoading: false })
  ),
  on(reposActions.repoUpdated, (state, { repo }) =>
    reposAdapter.upsertOne(repo, { ...state, isLoading: false })
  ),
  on(reposActions.repoDeleted, (state, { repoId }) =>
    reposAdapter.removeOne(repoId, { ...state, isLoading: false })
  ),
  on(
    reposActions.loadRepos,
    reposActions.createRepo,
    reposActions.updateRepo,
    reposActions.deleteRepo,
    (state) => ({
      ...state,
      isLoading: true
    })
  ),
);

export function reducer(state: ReposState | undefined, action: Action) {
  return reposReducer(state, action);
}
