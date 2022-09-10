import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../shared/components/header/header.component';
import { CreateFormComponent } from './create-form/create-form.component';
import { ListFormsComponent } from './list-forms/list-forms.component';

const routes: Routes = [
  {
    path: 'create/:id',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: CreateFormComponent,
      },
    ],
  },
  {
    path: '',
    component: HeaderComponent,
    children: [
      {
        path: '',
        component: ListFormsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsRoutingModule {}
