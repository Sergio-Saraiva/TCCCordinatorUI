import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { ConfigurationList } from '../configuration-list';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private readonly configurationFile = 'assets/config/config.txt';
  private configuration$: Observable<any>;

  constructor(private http: HttpClient) {}

  public load(): Observable<any> {
    if (!this.configuration$) {
      const callback = (acc, value) => {
        acc[value.environment] = value;
        return acc;
      };

      const configurationListIndexed = ConfigurationList.reduce(callback, {});

      this.configuration$ = this.http
        .get(this.configurationFile, { responseType: 'text' })
        .pipe(
          map((environment) => configurationListIndexed[environment.trim()])
        );
    }

    return this.configuration$;
  }
}
