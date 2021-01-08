import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnDestroy, OnInit {
  public isLogged: boolean;

  public isLoggedSub: Subscription;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedSub = this.authService.checkAuth().subscribe((el) => {
      this.isLogged = el;
    });
  }

  ngOnDestroy() {
    if (this.isLoggedSub) {
      this.isLoggedSub.unsubscribe();
    }
  }

  public logout(): void {
    this.authService.signOut().subscribe(() => this.router.navigate(['']));
  }
}
