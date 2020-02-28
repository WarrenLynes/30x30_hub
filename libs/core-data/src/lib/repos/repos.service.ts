import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Repo, emptyRepo } from './repo';

@Injectable({ providedIn: 'root' })
export class ReposService {

  constructor(private httpClient: HttpClient) { }

  all() {
    return this.httpClient.get('/api/user/repos').pipe(
      map((x: any) => x.map((xx) => ({...xx, id: xx.node_id})))
    )
  }

  create(model) {
    return this.httpClient.post('/api/user/repos', model).pipe(
      map((x: any) => ({...x, id: x.resourceName}))
    );
  }

  getUrlForId(id) {
    return `/api/user/repos/${id}`;
  }

  update(model) {
    return this.httpClient.put(this.getUrlForId(model.id), model).pipe(
      map((x: any) => ({...x, id: x.resourceName}))
    )
  }

  delete(modelId) {
    return this.httpClient.delete(this.getUrlForId(modelId))
  }
}
