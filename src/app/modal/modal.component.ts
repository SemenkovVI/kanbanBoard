import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RowComponent } from '../row/row.component';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  @Input() row: string;

  ngOnInit(): void {}

  onCreate() {
    this.dialog.open(FormComponent, {
      data: {
        row: this.row,
      },
    });
  }
}
