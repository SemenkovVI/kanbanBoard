import { Component, OnInit } from '@angular/core';
import { CRUDServiceService } from './crudservice.service';
import { Book } from './book';
import { AuthService } from './auth.service';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kanbanBoard';

  public tasks: Task[];

  ShowModal: any;

  constructor(private crudService: CRUDServiceService, public authService: AuthService) {}

  public addObject(): void {
    this.crudService.createEntity('tasks', {
      text: 'gdfhcb',
      id: '1',
      name: 'Task6',
    });
  }

  public createObject(): void {
    this.crudService.getData<Task>('tasks').subscribe((value: Task[]) => console.log(value));
  }

  public updateObject(): void {
    this.crudService.updateObject('books', 'FyrsQJGyrTtMowtN80tJ').subscribe();
  }

  public deleteObject(): void {
    this.crudService.deleteObject('tasks', 'QnptySLWoLK1bC9E3Rf8').subscribe();
  }

  public login(): void {
    this.authService.googleAuth().subscribe();
  }

  ngOnInit(): void {}
}
