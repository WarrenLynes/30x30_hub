import { Injectable } from '@angular/core';
import { Action, select, Store, ActionsSubject } from '@ngrx/store';
import * as fromRepos from './repos.reducer';
import * as reposActions from './repos.actions';
import {
  selectAllRepos,
  selectRepo,
  selectReposLoading
} from './repos.selectors';
import { Repo } from '@hub/core-data';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ReposFacade {
  allRepos$ = this.store.pipe(select(selectAllRepos));
  selectedRepo$ = this.store.pipe(select(selectRepo));
  repoLoading$ = this.store.pipe(select(selectReposLoading));

  constructor(
    private store: Store<fromRepos.ReposPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectRepo(selectedRepoId: any) {
    this.dispatch(reposActions.repoSelected({ selectedRepoId }));
  }

  loadRepos() {
    this.dispatch(reposActions.loadRepos());
  }

  createRepo(repo: Repo) {
    this.dispatch(reposActions.createRepo({ repo }));
  }

  updateRepo(repo: Repo) {
    this.dispatch(reposActions.updateRepo({ repo }));
  }

  deleteRepo(repoId: any) {
    this.dispatch(reposActions.deleteRepo({ repoId }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
