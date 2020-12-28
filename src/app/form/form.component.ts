import { Component, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CRUDServiceService } from '../crudservice.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  ReactiveForm: FormGroup;

  @Input()
  public row: string;

  constructor(
    private formBuild: FormBuilder,
    private crudService: CRUDServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public onSubmit(): any {
    const { controls } = this.ReactiveForm;

    if (this.ReactiveForm.invalid) {
      Object.keys(controls).forEach((controlName) => controls[controlName].markAsTouched());
    }
  }

  public isControlInvalid(controlName: string): boolean {
    const control = this.ReactiveForm.controls[controlName];
    const result = control.invalid && control.touched && control.value !== '';
    return result;
  }

  public isControlFilled(controlName: string): boolean {
    const control = this.ReactiveForm.controls[controlName];
    return control.value === '';
  }

  public deleteValue(): any {
    this.ReactiveForm.reset();
    this.ReactiveForm.markAsUntouched();
  }

  public addObject(): void {
    this.crudService.createEntity('tasks', {
      text: this.ReactiveForm.value.taskText,
      row: this.data.row,
      name: this.ReactiveForm.value.taskName,
      deadline: this.ReactiveForm.value.deadline,
    });
  }

  public updateObject(): void {
    this.crudService.updateObject('tasks', this.data.id, {
      text: this.ReactiveForm.value.taskText,
      row: this.data.row,
      name: this.ReactiveForm.value.taskName,
      deadline: this.ReactiveForm.value.deadline,
    });
  }

  private initForm(): void {
    if (this.data.id) {
      this.ReactiveForm = this.formBuild.group({
        taskName: [this.data.name, [Validators.required, Validators.pattern(/^[\S]{2,}/)]],
        taskText: [this.data.text, [Validators.required, Validators.pattern(/^[\S]/)]],
        deadline: [this.data.deadline, [Validators.required]],
      });
    } else {
      this.ReactiveForm = this.formBuild.group({
        taskName: ['', [Validators.required, Validators.pattern(/^[\S]{2,}/)]],
        taskText: ['', [Validators.required, Validators.pattern(/^[\S]/)]],
        deadline: ['', [Validators.required]],
      });
    }
  }

  public myFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    const dateNow = new Date();
    return date > dateNow;
  };
}
