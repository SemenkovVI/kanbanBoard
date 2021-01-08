import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TITLES } from '../mock-titles';
import { Tag } from '../tag';
import { CRUDServiceService } from '../services/crudservice.service';
import { ColorPickerComponent } from '../tags/tag/color-picker/color-picker.component';
import { Task } from '../task';
import {TagserviceService} from '../services/tagservice.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  ReactiveForm: FormGroup;

  @Input()
  public row: string;

  public Titles = TITLES;

  public rowNumber: number = parseInt(this.data.row, 10) - 1;

  allTags: string[];

  constructor(
    private formBuild: FormBuilder,
    private crudService: CRUDServiceService,
    private tagService: TagserviceService,
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

  public deleteObject(): void {
    this.crudService.deleteObject('tasks', this.data.id).subscribe();
  }
}
