import {Component} from '@angular/core';
import {Book} from "../book";
import {BookService} from "../book.service";


@Component({
  selector: 'app-create-book-modal',
  templateUrl: './create-book-modal.component.html',
  styleUrls: ['./create-book-modal.component.css']
})
export class CreateBookModalComponent {

  constructor(private bookService:BookService) {
  }
  handleSubmit(book:Book){
    this.bookService.createBook(book).subscribe(()=> this.bookService.initBooks())
  }


}
