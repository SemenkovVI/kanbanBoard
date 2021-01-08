import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ColorPickerModule } from '@iplab/ngx-color-picker';
import { ColorChromeModule } from 'ngx-color/chrome';
import { environment } from '../environments/environment';
import { FormComponent } from './form/form.component';
import { TaskComponent } from './task/task.component';
import { RowComponent } from './row/row.component';
import { BoardComponent } from './board/board.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalComponent } from './modal/modal.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ColorPickerComponent } from './tags/tag/color-picker/color-picker.component';
import { TagsComponent } from './tags/tags.component';
import { TagComponent } from './tags/tag/tag.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    RowComponent,
    TaskComponent,
    FormComponent,
    ModalComponent,
    HomeComponent,
    HeaderComponent,
    ColorPickerComponent,
    TagsComponent,
    TagComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatDialogModule,
    MatInputModule,
    DragDropModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatAutocompleteModule,
    ColorPickerModule,
    ColorPickerModule,
    ColorChromeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FormComponent],
})
export class AppModule {}
