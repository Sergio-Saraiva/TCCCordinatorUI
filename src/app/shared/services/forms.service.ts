import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '../models/FormModel';
import { ConfigurationService } from './configuration.service';
import { ServiceBaseRequests } from './service-base-requests';

@Injectable({
  providedIn: 'root',
})
export class FormsService extends ServiceBaseRequests<Form> {
  constructor(configService: ConfigurationService, httpClient: HttpClient) {
    super('forms', configService, httpClient);
  }
}
