import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/QuestionModel';
import { ConfigurationService } from './configuration.service';
import { ServiceBaseRequests } from './service-base-requests';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService extends ServiceBaseRequests<Question> {
  constructor(configService: ConfigurationService, httpClient: HttpClient) {
    super('questions', configService, httpClient);
  }
}
