import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Option } from '../models/OptionModel';
import { ConfigurationService } from './configuration.service';
import { ServiceBaseRequests } from './service-base-requests';

@Injectable({
  providedIn: 'root',
})
export class OptionsService extends ServiceBaseRequests<Option> {
  constructor(configService: ConfigurationService, httpClient: HttpClient) {
    super('options', configService, httpClient);
  }
}
