import { Component, OnInit, Input } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CRUDServiceService } from '../crudservice.service';
import { Task } from '../task';
import { FormComponent } from '../form/form.component';
import firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  constructor(
    private crudService: CRUDServiceService,
    private firestoreService: AngularFirestore,
    private dialog: MatDialog,
  ) {}

  @Input() public text: string;

  @Input() public index: string;

  @Input() public id: string;

  @Input() public taskID: string;

  @Input() public taskName: string;

  @Input() public deadline: Timestamp;

  @Input() public task: Task;

  @Input() public tags: [] | undefined;

  ngOnInit(): void {}

  public deleteObject(): void {
    this.crudService.deleteObject('tasks', this.taskID).subscribe();
  }

  onCreate() {
    console.log(this.tags);
    this.dialog.open(FormComponent, {
      data: {
        id: this.taskID,
        name: this.taskName,
        row: this.index,
        text: this.text,
        deadline: new Date(this.deadline.seconds * 1000),
        tags: this.tags,
      },
    });
  }
}
