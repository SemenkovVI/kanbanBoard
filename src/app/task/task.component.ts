import { Component, OnInit, Input } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {CRUDServiceService} from '../crudservice.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Task} from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() public text: string;
  @Input() public index: string;
  @Input() public id: string;

  constructor() { }

  ngOnInit(): void {
  }
}
