import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import { ReposFacade } from './repos.facade';
import * as reposActions from './repos.actions';
import { Repo, ReposService, SnackbarService } from '@hub/core-data';
import { ReposPartialState } from './repos.reducer';
import { AppFacade } from '../app/app.facade';

@Injectable()
export class ReposEffects {
  loadRepos$ = createEffect(() =>
    this.dataPersistence.fetch(reposActions.loadRepos, {
      run: (
        action: ReturnType<typeof reposActions.loadRepos>,
        state: ReposPartialState
      ) => {
        this.appFacade.addLoad('[REPOS][LOAD]');
        return this.reposService.all().pipe(
          tap(() => this.notifyService.openSnackBar('Successfully Loaded Repos')),
          map((repos: any) => reposActions.reposLoaded({ repos: repos})),
          tap(() => this.appFacade.removeLoad('[REPOS][LOAD]'))
        );
      },
      onError: (action: ReturnType<typeof reposActions.loadRepos>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  addRepo$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(reposActions.createRepo, {
      run: (
        action: ReturnType<typeof reposActions.createRepo>,
        state: ReposPartialState
      ) => {
        this.appFacade.addLoad('[REPOS][CREATE]');

        return this.reposService.create(action.repo).pipe(
          map((repo: Repo) => reposActions.repoCreated({ repo })),
          tap(() => this.notifyService.openSnackBar('Successfully Added a Repo')),
          tap(() => this.appFacade.removeLoad('[REPOS][CREATE]'))
        );
      },
      onError: (action: ReturnType<typeof reposActions.createRepo>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  updateRepo$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(reposActions.updateRepo, {
      run: (
        action: ReturnType<typeof reposActions.updateRepo>,
        state: ReposPartialState
      ) => {
        this.appFacade.addLoad('[REPOS][UPDATE]');

        return this.reposService.update(action.repo).pipe(
          map((repo: any) => reposActions.repoUpdated({ repo })),
          tap(() => this.notifyService.openSnackBar('Successfully Updated a Repo')),
          tap(() => this.appFacade.removeLoad('[REPOS][UPDATE]'))
        );
      },
      onError: (action: ReturnType<typeof reposActions.updateRepo>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  deleteRepo$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(reposActions.deleteRepo, {
      run: (
        action: ReturnType<typeof reposActions.deleteRepo>,
        state: ReposPartialState
      ) => {
        this.appFacade.addLoad('[REPOS][DELETE]');
        return this.reposService.delete(action.repoId).pipe(
          map((repos: any[]) => reposActions.repoDeleted({ repoId: action.repoId, repos })),
          tap(() => this.notifyService.openSnackBar('Successfully Deleted a Repo')),
          // tap(() => this.reposFacade.loadRepos()),
          tap(() => this.appFacade.removeLoad('[REPOS][DELETE]'))
        );
      },
      onError: (action: ReturnType<typeof reposActions.deleteRepo>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<ReposPartialState>,
    private reposService: ReposService,
    private reposFacade: ReposFacade,
    private notifyService: SnackbarService,
    private appFacade: AppFacade
  ) {}
}
