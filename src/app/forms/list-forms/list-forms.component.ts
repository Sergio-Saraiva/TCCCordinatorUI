import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Form } from 'src/app/shared/models/FormModel';
import { FormsService } from 'src/app/shared/services/forms.service';

@Component({
  selector: 'app-list-forms',
  templateUrl: './list-forms.component.html',
  styleUrls: ['./list-forms.component.scss'],
})
export class ListFormsComponent implements OnInit {
  public displayedColumns: string[] = [
    'name',
    'createdAt',
    'updatedAt',
    'remove',
    'edit',
  ];
  public forms: Form[];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private readonly formsService: FormsService,
    private router: Router,
    public createFormDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAllForms();
  }

  private loadAllForms() {
    this.formsService.getAll().subscribe((data) => {
      this.forms = data;
      this.dataSource.data = this.forms;
      this.dataSource.paginator = this.paginator;
    });
  }

  goToCreateForm() {
    let createdForm: Form;
    this.formsService.create({ name: 'Novo Formulário' }).subscribe(
      (data) => {
        createdForm = data;
      },
      (err) => console.log(err),
      () => {
        this.router.navigate([`/create/${createdForm.id}`]);
      }
    );
  }

  goToEditPage(formId: string) {
    this.router.navigate([`/create/${formId}`]);
  }

  deleteForm(formdId: string) {
    this.formsService.delete(formdId).subscribe(
      (data) => console.log(data),
      (err) => console.log(err),
      () => {
        this.loadAllForms();
      }
    );
  }
}
