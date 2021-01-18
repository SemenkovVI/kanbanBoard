import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDServiceService } from '../services/crudservice.service';
import { Task } from '../task';
import { FormComponent } from '../form/form.component';
import { Tag } from '../tag';
import { TagserviceService } from '../services/tagservice.service';
import { UserService } from '../services/user.service';
import { User } from '../user';
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
    public route: ActivatedRoute,
    private router: Router,
    private tagService: TagserviceService,
    private userService: UserService,
  ) {}

  routeQueryParams$: Subscription;

  @Input() public text: string;

  @Input() public index: string;

  @Input() public id: string;

  @Input() public taskID: string;

  @Input() public taskName: string;

  @Input() public deadline: Timestamp;

  @Input() public user?: string;

  @Input() public task: Task;

  public tags: Tag[];

  public taskUser: User;

  public taskDeadline: any;

  ngOnInit(): void {
    this.tagService.getTags<Tag>('tags', this.index, this.taskID).subscribe((value: Tag[]) => {
      this.tags = value;
    });

    this.taskDeadline = new Date(this.deadline.seconds * 1000);

    if (this.user) {
      this.userService.getUserById<User>('users', this.user).subscribe((value) => {
        [this.taskUser] = value;
      });
    }
    if (this.router.url === `/board?taskId=${this.taskID}`) {
      this.onCreate();
    }
  }

  public checkDeadline(taskDate: any) {
    return new Date(taskDate) < new Date();
  }

  // public deleteObject(): void {
  //   this.crudService.deleteObject('tasks', this.taskID).subscribe();
  // }

  public goToTask() {
    this.router.navigate(['/board'], {
      queryParams: {
        taskId: this.task.id,
      },
    });
    this.onCreate();
  }

  onCreate() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: {
        id: this.taskID,
        name: this.taskName,
        row: this.index,
        text: this.text,
        deadline: new Date(this.deadline.seconds * 1000),
        user: this.user,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      if (this.routeQueryParams$) {
        this.routeQueryParams$.unsubscribe();
      }
      this.router.navigate(['.'], { relativeTo: this.route });
    });
  }
}
