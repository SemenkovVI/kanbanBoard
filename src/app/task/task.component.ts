import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CRUDServiceService } from '../crudservice.service';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() public text: string;

  @Input() public index: string;

  @Input() public id: string;

  @Input() public taskName: string;

  ngOnInit(): void {}
}
