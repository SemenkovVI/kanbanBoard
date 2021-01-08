import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CRUDServiceService } from '../services/crudservice.service';
import { Task } from '../task';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent implements OnInit {
  constructor(private crudService: CRUDServiceService) {
  }

  @Input()
  public name: string;

  @Input()
  public id: string;

  @Input()
  public header: string;

  public tasks: Task[];

  showModal: boolean;

  ngOnInit(): void {
    this.crudService.getData<Task>('tasks', this.id).subscribe((value: Task[]) => {
      this.tasks = value;
    });
  }

  onClose(isVisible: boolean) {
    this.showModal = isVisible;
  }

  onOpen(isVisible: boolean) {
    this.showModal = isVisible;
  }

  public updateObject(id: string, data: {}): void {
    this.crudService.updateObject('tasks', id, data);
  }

  public drop(event: CdkDragDrop<object[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      const taskId = event.item.getRootElement().getAttribute('ng-reflect-task-i-d');
      const currentTask = this.tasks.find((task) => task.id === taskId);
      const parentRowId = parseInt(event.container.id.replace(/[^\d]/g, ''), 10);
      if (currentTask && taskId) {
        currentTask.row = (parentRowId + 1).toString();
        this.updateObject(taskId, currentTask);
      }
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
