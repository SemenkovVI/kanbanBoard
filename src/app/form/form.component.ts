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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TITLES } from '../mock-titles';
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

  tagsCtrl = new FormControl();

  public tags: string[] = this.data.tags ? this.data.tags : [];

  public Titles = TITLES;

  public rowNumber: number = parseInt(this.data.row, 10) - 1;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  filteredTags: Observable<string[]>;

  @ViewChild('tagsInput') fruitInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  allTags: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  constructor(
    private formBuild: FormBuilder,
    private crudService: CRUDServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(this.tags);
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this.filter(tag) : this.allTags.slice())),
    );
  }

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
      tags: this.tags,
    });
  }

  public updateObject(): void {
    this.crudService.updateObject('tasks', this.data.id, {
      text: this.ReactiveForm.value.taskText,
      row: this.data.row,
      name: this.ReactiveForm.value.taskName,
      deadline: this.ReactiveForm.value.deadline,
      tags: this.tags,
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

  public remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.updateObject();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  public add(event: MatChipInputEvent): void {
    const { input } = event;
    const { value } = event;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    if (this.data.id) {
      this.updateObject();
    }

    this.tagsCtrl.setValue(null);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((tag) => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
