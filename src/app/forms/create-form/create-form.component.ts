import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Form } from 'src/app/shared/models/FormModel';
import { Question } from 'src/app/shared/models/QuestionModel';
import { FormsService } from 'src/app/shared/services/forms.service';
import { OptionsService } from 'src/app/shared/services/options.service';
import { QuestionsService } from 'src/app/shared/services/questions.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  createdFormId: string;
  form: Form = { name: 'Carregando' } as Form;

  formTitleEditMode: boolean = true;

  //para editar uma pergunta
  questionsEditMode: boolean[] = [];
  questionsEditModeValue: Question = { statement: 'Carregando' } as Question;

  //para editar uma opção
  enableOptionsEditMode: boolean[] = [];
  editOptionFormGroup: FormGroup[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly formsService: FormsService,
    private readonly optionsService: OptionsService,
    private readonly questionsService: QuestionsService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params: ParamMap) => (this.createdFormId = params.get('id'))
    );
    this.loadForm();
  }

  private loadForm() {
    this.formsService.getById(this.createdFormId).subscribe(
      (data) => {
        this.form = data;
        data.questions.map((question) => {
          this.questionsEditMode[question.id] = true;
          this.questionsEditModeValue[question.id] = question;

          question.options.map((option) => {
            this.enableOptionsEditMode[option.id] = true;
            this.editOptionFormGroup[option.id] = this.formBuilder.group({
              value: new FormControl(option.value, [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(20),
              ]),
            });
          });
        });
        console.log(data);
      },
      (err) => console.log(err),
      () => {}
    );
  }

  enableFormTitleEditMode() {
    this.formTitleEditMode = false;
  }

  disableFormEditMode() {
    this.formTitleEditMode = true;
    this.formsService
      .update({ id: this.form.id, name: this.form.name })
      .subscribe(
        (data) => console.log(data),
        (err) => console.log(err),
        () => {
          this.loadForm();
        }
      );
  }

  createQuestion() {
    this.questionsService
      .create({
        statement: 'Nova Pergunta',
        formId: this.createdFormId,
        type: 0,
      })
      .subscribe(
        (data) => console.log(data),
        (err) => console.log(err),
        () => {
          this.loadForm();
        }
      );
  }

  enableQuestionEditMode(questionId: string) {
    this.questionsEditMode[questionId] = false;
  }

  disableQuestionEditMode(questionId: string) {
    this.questionsEditMode[questionId] = true;
    console.log(this.questionsEditModeValue[questionId]);
    this.questionsService
      .update(this.questionsEditModeValue[questionId])
      .subscribe(
        (data) => console.log(data),
        (err) => console.log(err),
        () => {
          this.loadForm();
        }
      );
  }

  removeQuestion(questionId: string) {
    this.questionsService.delete(questionId).subscribe(
      (data) => console.log(data),
      (err) => console.log(err),
      () => {
        this.loadForm();
      }
    );
  }

  createOption(questionId: string) {
    this.optionsService
      .create({
        questionId: questionId,
        order: 0,
        value: 'Nova Opção',
      })
      .subscribe(
        (data) => console.log(data),
        (err) => console.log(err),
        () => this.loadForm()
      );
  }

  enableOptionEditMode(optionId: string, elementRef?: HTMLInputElement) {
    this.enableOptionsEditMode[optionId] = false;
    if (elementRef !== undefined) {
      console.log(elementRef);
      elementRef.focus();
    }
  }

  disableEnableOptionEditMode(optionId: string, questionId: string) {
    this.enableOptionsEditMode[optionId] = true;
    this.optionsService
      .update({
        id: optionId,
        questionId: questionId,
        order: 0,
        value: this.editOptionFormGroup[optionId].value.value,
      })
      .subscribe(
        (data) => console.log(data),
        (err) => console.log(err),
        () => this.loadForm()
      );
  }

  removeOption(optionId: string) {
    this.optionsService.delete(optionId).subscribe(
      (data) => console.log(data),
      (err) => console.log(err),
      () => {
        this.loadForm();
      }
    );
  }
}
