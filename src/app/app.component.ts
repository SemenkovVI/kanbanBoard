import {Component, OnDestroy, OnInit} from '@angular/core';
import { CRUDServiceService } from './services/crudservice.service';
import { Book } from './book';
import { AuthService } from './services/auth.service';
import { Task } from './task';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'kanbanBoard';

  public tasks: Task[];

  constructor(
    private crudService: CRUDServiceService,
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  async ngOnDestroy() {
    await this.authService.signOut();
  }
}
