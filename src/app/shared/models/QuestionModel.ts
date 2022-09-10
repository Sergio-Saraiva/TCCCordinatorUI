import { Option } from './OptionModel';

export interface Question {
  id?: string;
  formId: string;
  statement: string;
  options?: Option[];
  type: number;
  createdAt?: string;
  updatedAt?: string;
}
