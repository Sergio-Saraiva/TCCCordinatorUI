import { Question } from './QuestionModel';

export interface Form {
  id?: string;
  name: string;
  questions?: Question[];
  createdAt?: string;
  updatedAt?: string;
}
