import { createAction, props } from '@ngrx/store';

import { Repo } from '@hub/core-data';

export const repoSelected = createAction(
  '[REPOS][SELECTED]',
  props<{ selectedRepoId: string }>()
);
export const loadRepos = createAction(
  '[REPOS][LOAD]'
);
export const reposLoaded = createAction(
  '[REPOS][LOADED]',
  props<{ repos: any[] }>()
);
export const createRepo = createAction(
  '[REPOS][CREATE]',
  props<{ repo: any }>()
);
export const repoCreated = createAction(
  '[REPOS][CREATED]',
  props<{ repo: any }>()
);
export const updateRepo = createAction(
  '[REPOS][UPDATE]',
  props<{ repo: any }>()
);
export const repoUpdated = createAction(
  '[REPOS][UPDATED]',
  props<{ repo: any }>()
);
export const deleteRepo = createAction(
  '[REPOS][DELETE]',
  props<{ repoId: any }>()
);
export const repoDeleted = createAction(
  '[REPOS][DELETED]',
  props<{ repoId: any, repos: any[] }>()
);
