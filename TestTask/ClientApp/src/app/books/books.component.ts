import {Component, OnInit} from '@angular/core';
import {BookService} from "./book.service";
import {filter, Observable} from "rxjs";
import {Book} from "./book";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {ExportService} from "./export.service";



@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements  OnInit{
  books$!: Observable<Book[]>;

  books :Book[] = [];

  filteredBooks :Book[] = [];

  searchString:string = "";

  sortOptions = [
    {name: 'Name', value: 'name'},
    {name: 'Date', value: 'date'},
    {name: 'Pages count', value: 'pagesCount'}
  ]
  selectedSortValue = this.sortOptions[0].value;
  dateRange: Date[] = [];

  defaultRanges = this.getRanges();

  constructor(private bookService:BookService, protected exportService:ExportService) {
  }
  ngOnInit(): void {
   this.bookService.initBooks();
   this.books$ = this.bookService.books$;
   this.books$.subscribe(res =>{
     this.books = res;
     this.filteredBooks = res;
     this.filterBySearch();
     this.filterByDatesRange(this.dateRange);
     this.sortBy(this.selectedSortValue);
   })
  }

  onSearchChanged(){
    this.filterBySearch();
    this.filterByDatesRange(this.dateRange);
    this.sortBy(this.selectedSortValue)
  }

  onDateRangeChanged(dates:any){
    this.filterBySearch();
   this.filterByDatesRange(dates);
   this.sortBy(this.selectedSortValue)
  }
  onSortSelected(event:any) {
    const option = event.target.value;
    this.sortBy(option)
  }

  filterBySearch(){
    this.filteredBooks = this.books.filter(b => b.name.toLowerCase().includes(this.searchString.toLowerCase()));
  }

  filterByDatesRange(dates:Date[]){
    if(dates && dates.length > 0){
      this.filteredBooks = this.books.filter(b =>{
        const date = new Date(b.publishingDate).getTime();
        return date >= dates[0].valueOf() && date <= dates[1].valueOf();
      })
    }
  }
  sortBy(option:string){
    switch (option) {
      case 'name':
        this.filteredBooks.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'date':
        this.filteredBooks.sort((a, b) => {
          const left = a.publishingDate.valueOf();
          const right = b.publishingDate.valueOf();
          if(left < right){
            return -1;
          }
          else if(left > right){
            return 1;
          }
          else {
            return 0;
          }
        });
        break;
      case 'pagesCount':
        this.filteredBooks.sort((a, b) => a.pagesCount - b.pagesCount)
        break;
    }

  }
  private getRanges(){
    const currentDate = new Date();
    const ranges = [{
      value: [new Date(currentDate.getFullYear(),currentDate.getMonth(),1), currentDate],
      label: 'За цей місяць'
    },
      {
      value: [new Date(currentDate.getFullYear(),0,1), currentDate],
      label: 'За цей рік'
    }];

    return ranges;
  }





}
