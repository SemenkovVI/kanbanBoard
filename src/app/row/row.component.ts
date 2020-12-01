import { Component, OnInit, Input } from '@angular/core';
import { TASKS } from '../mock-tasks';
import {AngularFireAuth} from '@angular/fire/auth';
import {CRUDServiceService} from '../crudservice.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Task} from '../task';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {

  constructor(private crudService: CRUDServiceService) { }

  @Input()
  public name: string;
  @Input()
  public id: string;
  @Input()
  public header: string;

  public tasks: Task[];

  ngOnInit(): void {
    this.crudService.getData<Task>('tasks').subscribe((value: Task[]) => this.tasks = value);
  }

}
