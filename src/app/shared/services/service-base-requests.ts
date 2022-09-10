import { Observable, switchMap } from 'rxjs';
import { ServiceBase } from './service-base';

export class ServiceBaseRequests<S> extends ServiceBase {
  getAll(query?: string): Observable<S[]> {
    if (!query) {
      query = '';
    }

    return this.url$.pipe(
      switchMap((url) => this.httpClient.get<S[]>(`${url}`))
    );
  }

  getById(id: string): Observable<S> {
    return this.url$.pipe(
      switchMap((url) => this.httpClient.get<S>(`${url}/${id}`))
    );
  }

  create(entity: S): Observable<S> {
    return this.url$.pipe(
      switchMap((url) => this.httpClient.post<S>(`${url}`, entity))
    );
  }

  update(entity: S): Observable<S> {
    return this.url$.pipe(
      switchMap((url) => this.httpClient.put<S>(`${url}`, entity))
    );
  }

  delete(id: string): Observable<any> {
    return this.url$.pipe(
      switchMap((url) => this.httpClient.delete<any>(`${url}/${id}`))
    );
  }
}
