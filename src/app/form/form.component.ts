import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUDServiceService } from '../crudservice.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  ReactiveForm: FormGroup;

  @Input()
  public id: string;

  @Input()
  public showModal: boolean;

  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(private formBuild: FormBuilder, private crudService: CRUDServiceService) {}

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

    const result = control.invalid && control.touched;

    return result;
  }

  public deleteValue(): any {
    this.ReactiveForm.patchValue({
      taskName: '',
      taskText: '',
    });
  }

  public addObject(): void {
    this.crudService.createEntity('tasks', {
      text: this.ReactiveForm.value.taskText,
      id: this.id,
      name: this.ReactiveForm.value.taskName,
    });
  }

  private initForm(): void {
    this.ReactiveForm = this.formBuild.group({
      taskName: ['', [Validators.required, Validators.pattern(/^[a-z0-9_-]{3,16}$/)]],
      taskText: ['', [Validators.required, Validators.pattern(/[А-яA-z]/)]],
    });
  }

  onCloseModal(event: any) {
    this.closeModalEvent.emit(false);
  }
}
