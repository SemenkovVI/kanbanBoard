import { Component, OnInit, Input } from '@angular/core';
import { TASKS } from './../mock-tasks';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit {

  constructor() { }

  @Input()
  public name: string | undefined;
  @Input()
  public id: number | undefined;
  @Input()
  public header: string | undefined;

  ngOnInit(): void {
  }

  public tasks = TASKS;

}
