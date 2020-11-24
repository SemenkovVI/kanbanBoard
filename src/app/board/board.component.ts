import { Component, OnInit } from '@angular/core';
import { TITLES } from '../mock-titles';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public titles = TITLES;
}
