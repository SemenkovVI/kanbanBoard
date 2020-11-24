import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() public text: string | undefined;
  @Input() public index: number | undefined;
  @Input() public id: number | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
