import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReposFacade } from '@hub/core-state';
import { Observable } from 'rxjs';
import { Repo } from '@hub/core-data';

@Component({
  selector: 'hub-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  repo$: Observable<Repo> = this.repoFacade.selectedRepo$;

  constructor(
    private route: ActivatedRoute,
    private repoFacade: ReposFacade
  ) { }

  ngOnInit() {
    const routeSnap = this.route.snapshot;

    if(routeSnap.paramMap.has('id')) {
      this.repoFacade.selectRepo(routeSnap.paramMap.get('id'))
    }
  }
}
