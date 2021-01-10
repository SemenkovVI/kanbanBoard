import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Task } from '../task';
import { CRUDServiceService } from '../services/crudservice.service';
import { AuthService } from '../services/auth.service';
import { Title } from '../title';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  public titles: Title[];

  public sortTitles: Title[];

  public tasks: Task[];

  constructor(
    public authService: AuthService,
    private router: Router,
    private crudService: CRUDServiceService,
  ) {
    this.crudService.getData<Title>('titles').subscribe((value) => {
      this.titles = value.sort((value1, value2) => (value1.index > value2.index ? 1 : -1));
    });
  }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeunloadHandler(event: any) {
  //   this.authService.signOut();
  // }

  public logout(): void {
    this.authService.signOut().subscribe(() => this.router.navigate(['']));
  }
}
