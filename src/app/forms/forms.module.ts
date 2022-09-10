import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFormComponent } from './create-form/create-form.component';
import { FormsRoutingModule } from './forms.routes';
import { SharedModule } from '../shared/shared.module';
import { ListFormsComponent } from './list-forms/list-forms.component';

@NgModule({
  declarations: [CreateFormComponent, ListFormsComponent],
  imports: [FormsRoutingModule, SharedModule, CommonModule],
})
export class FormsModule {}
