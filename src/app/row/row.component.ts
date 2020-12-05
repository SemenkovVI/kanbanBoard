import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CRUDServiceService } from '../crudservice.service';
import { Task } from '../task';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent implements OnInit {
  constructor(private crudService: CRUDServiceService) {}

  @Input()
  public name: string;

  @Input()
  public id: string;

  @Input()
  public header: string;

  public tasks: Task[];

  showModal: boolean;

  ngOnInit(): void {
    this.crudService.getData<Task>('tasks').subscribe((value: Task[]) => {
      this.tasks = value;
    });
  }

  public addObject(): void {
    this.crudService.createEntity('tasks', {
      text: 'Hello',
      id: '2',
      name: 'Task8',
    });
  }

  onClose(isVisible: boolean) {
    this.showModal = isVisible;
  }
}
