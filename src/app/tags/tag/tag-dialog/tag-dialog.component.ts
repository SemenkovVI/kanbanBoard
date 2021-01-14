import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.scss']
})
export class TagDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

}
