import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BookService} from "./book.service";
import { BookItemComponent } from './book-item/book-item.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ModalComponent } from './modal/modal.component';
import { CreateBookModalComponent } from './create-book-modal/create-book-modal.component';
import {NgChartsModule} from "ng2-charts";
import { BooksChartComponent } from './books-chart/books-chart.component';
import {ExportService} from "./export.service";




@NgModule({
  declarations:[
    BooksComponent,
    BookItemComponent,
    ModalComponent,
    CreateBookModalComponent,
    BooksChartComponent,
  ],
  exports: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgChartsModule

  ],
  providers:[
    BookService,
    ExportService
  ]
})
export class BooksModule { }
