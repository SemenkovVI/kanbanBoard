import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import firebase from 'firebase';
import { MatDialog } from '@angular/material/dialog';
import { Tag } from '../../tag';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { CRUDServiceService } from '../../services/crudservice.service';
import { TagserviceService } from '../../services/tagservice.service';
import { TagDialogComponent } from './tag-dialog/tag-dialog.component';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() tag: Tag;

  @Input() rowId: string;

  @Input() tags: Tag[];

  @Input() isForm: boolean;

  public color: string;

  constructor(
    private tagService: TagserviceService,
    public colorPickerDialog: MatDialog,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.dialog.open(TagDialogComponent, {
      width: '250px',
      data: { name: this.tag.name },
    });
  }

  public updateTags(color: string): void {
    this.tagService.update('tags', this.tag.id, {
      color,
    });
  }

  public deleteTag(): void {
    console.log(this.rowId);
    this.tagService.update('tags', this.tag.id, {
      uid: firebase.firestore.FieldValue.arrayRemove(this.rowId),
    });
  }

  public remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  openColorPickerDialog(tag: any): void {
    const dialogRef = this.colorPickerDialog.open(ColorPickerComponent, {
      data: {},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateTags(result);
      }
    });
  }
}
