import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Repo } from '@hub/core-data';
import { ReposFacade } from '@hub/core-state';

@Component({
  selector: 'hub-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  repos$: Observable<Repo[]> = this.reposFacade.allRepos$;
  repo$: Observable<Repo> = this.reposFacade.selectedRepo$;

  constructor(
    private reposFacade: ReposFacade
  ) { }

  ngOnInit() {
    this.reposFacade.loadRepos();
  }

  selectRepo(id) {
    this.reposFacade.selectRepo(id);
  }
}
