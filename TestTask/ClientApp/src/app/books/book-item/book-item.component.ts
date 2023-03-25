import {Component, Input} from '@angular/core';
import {Book} from "../book";
import {BookService} from "../book.service";

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent {
@Input() book!:Book;

constructor(private bookService:BookService) {
}

onSubmit(changedBook:Book){
  const resultBook:Book = {...changedBook,id:this.book?.id};
  this.bookService.updateBook(resultBook).subscribe(()=>{
    this.bookService.initBooks()
  });
}
}
