import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  selectedColor = '#e0e0e0';

  constructor(public dialogRef: MatDialogRef<ColorPickerComponent>) {}

  ngOnInit(): void {}

  onChangeComplete(c: any) {
    this.selectedColor = c.color.hex;
    console.log(c);
  }
}
