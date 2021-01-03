import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TITLES } from '../mock-titles';
import { Task } from '../task';
import { CRUDServiceService } from '../crudservice.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  constructor(public authService: AuthService, private router: Router) {}

  public titles = TITLES;

  public tasks: Task[];

  // @HostListener('window:beforeunload', ['$event'])
  // beforeunloadHandler(event: any) {
  //   this.authService.signOut();
  // }

  public logout(): void {
    this.authService.signOut().subscribe(() => this.router.navigate(['']));
  }
}
