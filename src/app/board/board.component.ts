import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TITLES } from '../mock-titles';
import { Task } from '../task';
import { CRUDServiceService } from '../crudservice.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(private crudService: CRUDServiceService) {}

  public titles = TITLES;

  public tasks: Task[];

  ngOnInit(): void {}

  public createObject(): void {
    /* this.crudService.getData<Task>('tasks').subscribe((value: Task[])  => {
       console.log(value);
       this.tasks
     }
     });
   } */
  }
}
