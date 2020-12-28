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

  constructor(private crudService: CRUDServiceService, public authService: AuthService) {}

  ngOnInit(): void {}
}
