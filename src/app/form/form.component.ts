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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import { Tag } from '../tag';
import { CRUDServiceService } from '../services/crudservice.service';
import { ColorPickerComponent } from '../tags/tag/color-picker/color-picker.component';
import { Task } from '../task';
import { TagserviceService } from '../services/tagservice.service';
import { Title } from '../title';
import { MyErrorStateMatcher } from '../MyErrorStateMatcher';
import { User } from '../user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  ReactiveForm: FormGroup;

  @Input()
  public row: string;

  public Titles: Title[];

  public users: User[];

  public rowNumber: number = parseInt(this.data.row, 10) - 1;

  public selectedRow: string;

  public selectUser: string | undefined;

  public currentTitle: any;

  public currentUser: any;

  allTags: Tag[];

  public matcher: any;

  constructor(
    private formBuild: FormBuilder,
    private crudService: CRUDServiceService,
    private tagService: TagserviceService,
    private route: ActivatedRoute,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.crudService.getData<Title>('titles').subscribe((value) => {
      this.Titles = value.sort((value1, value2) => (value1.index > value2.index ? 1 : -1));
      this.selectedRow = this.Titles[this.rowNumber].name;
    });

    if (this.data.user) {
      this.userService.getUserById<User>('users', this.data.user).subscribe((value) => {
        this.selectUser = value[0].displayName;
      });
    }

    this.crudService.getData<User>('users').subscribe((value) => {
      this.users = value;
    });

    if (this.data.id) {
      this.tagService.getTags<Tag>('tags', this.row, this.data.id).subscribe((value: Tag[]) => {
        this.allTags = value;
      });
    }

    if (this.data.id) {
      this.matcher = new MyErrorStateMatcher();
    }
  }

  public updateRow(event: any) {
    this.currentTitle = this.Titles.find((el) => {
      return el.name === event.value;
    });
    this.updateObject(this.currentTitle.index);
  }

  public updateUser(event: any) {
    this.currentUser = this.users.find((el) => {
      return el.displayName === event.value;
    });
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
    if (this.currentUser) {
      this.crudService.createEntity('tasks', {
        text: this.ReactiveForm.value.taskText,
        row: this.data.row,
        name: this.ReactiveForm.value.taskName,
        deadline: this.ReactiveForm.value.deadline,
        user: this.currentUser.uid,
      });
    } else {
      this.crudService.createEntity('tasks', {
        text: this.ReactiveForm.value.taskText,
        row: this.data.row,
        name: this.ReactiveForm.value.taskName,
        deadline: this.ReactiveForm.value.deadline,
        user: this.data.user,
      });
    }
  }

  public updateObject(row: string): void {
    this.crudService.updateObject('tasks', this.data.id, {
      text: this.ReactiveForm.value.taskText,
      row,
      name: this.ReactiveForm.value.taskName,
      deadline: this.ReactiveForm.value.deadline,
    });
  }

  public update(user: string): void {
    this.crudService.updateObject('tasks', this.data.id, {
      user,
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

  public checkDate(): boolean {
    // const control = this.ReactiveForm.controls[controlName];
    // console.log(control.value < new Date());
    // console.log(new Date());
    return this.data.deadline < new Date();
    // return control.value < new Date() && control.untouched;
  }

  public myFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    const dateNow = new Date();
    return date > dateNow;
  };

  public deleteObject(): void {
    this.crudService.deleteObject('tasks', this.data.id).subscribe();
    this.allTags.forEach((el) => {
      this.tagService.update('tags', el.id, {
        uid: firebase.firestore.FieldValue.arrayRemove(this.data.id),
      });
    });
  }
}

// function ValidateDeadline(control: AbstractControl): { [key: string]: any } | null {
//   if (control.value < new Date()) {
//     return { deadlineInvalid: true };
//   }
//   return null;
// }
