import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  REPOS_FEATURE_KEY,
  reposAdapter,
  ReposState
} from './repos.reducer';
import { emptyRepo } from '@hub/core-data';

export const selectReposState =
  createFeatureSelector<ReposState>(REPOS_FEATURE_KEY);

const { selectAll, selectEntities } = reposAdapter.getSelectors();

export const selectReposLoading = createSelector(
  selectReposState,
  (state: ReposState) => state.isLoading
);

export const selectAllRepos = createSelector(
  selectReposState,
  (state: ReposState) => selectAll(state)
);

export const selectReposEntities = createSelector(
  selectReposState,
  (state: ReposState) => selectEntities(state)
);

export const selectRepoId = createSelector(
  selectReposState,
  (state: ReposState) => state.selectedRepoId
);

export const selectRepo = createSelector(
  selectReposEntities,
  selectRepoId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId] : emptyRepo
  }
);
