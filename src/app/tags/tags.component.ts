import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {MatAutocomplete, MatAutocompleteActivatedEvent, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import firebase from 'firebase';
import { CRUDServiceService } from '../services/crudservice.service';
import { Tag } from '../tag';
import { TagserviceService } from '../services/tagservice.service';
import {MatOptionSelectionChange} from '@angular/material/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  @Input() row: string;

  @Input() id: string;

  public tags: Tag[];

  public allTagsName: string[];

  public tagId: string[];

  public color = '#e0e0e0';

  tagsCtrl = new FormControl();

  separatorKeysCodes: number[] = [ENTER, COMMA];

  filteredTags: Observable<string[]>;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private tagService: TagserviceService) {}

  ngOnInit(): void {
    this.tagService.getTags<Tag>('tags', this.row, this.id).subscribe((value: Tag[]) => {
      this.tags = value;
    });

    this.tagService.getNamesOfTags('tags').subscribe((value: string[]) => {
      this.allTagsName = value;

      this.filteredTags = this.tagsCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) => (tag ? this.filter(tag) : this.allTagsName.slice())),
      );
    });
  }

  public clear(event: MatOptionSelectionChange) {
    console.log(event.source.value);
  }

  public addObject(name: string, color: string): void {
    this.tagService.createEntity('tags', {
      uid: [this.id],
      name,
      color,
    });
  }

  public updateTags(): void {
    this.tagService.update('tags', this.id, {
      uid: firebase.firestore.FieldValue.arrayRemove(this.id),
    });
  }

  public addTags(tagId: string): void {
    this.tagService.update('tags', tagId, {
      uid: firebase.firestore.FieldValue.arrayUnion(this.id),
    });
  }

  public getTagId() {
    this.tagService.getTagId('tags', this.row, this.allTagsName).subscribe((value) => {
      this.tagId = value;
    });
  }

  public remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  public selected(event: any): void {
    const index = this.allTagsName.indexOf(event.option.value);
    if (this.tagId) {
      this.addTags(this.tagId[index]);
    }
    this.tagInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
  }

  public add(event: MatChipInputEvent): void {
    const { input } = event;
    const { value } = event;

    if ((value || '').trim()) {
      // this.tags.push(value.trim());
      this.addObject(value.trim(), this.color);
    }

    if (input) {
      input.value = '';
    }

    if (this.id) {
      this.updateTags();
    }

    this.tagsCtrl.setValue(null);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTagsName.filter((tag) => tag.toLowerCase().indexOf(filterValue) === 0);
  }
}
