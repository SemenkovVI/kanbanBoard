import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  public navigate1(): void {
    this.router.navigate(['']);
  }

  public login(): void {
    this.authService.googleAuth().subscribe(() => this.router.navigate(['board']));
    console.log(this.authService.user$);
  }
}
