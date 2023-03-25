import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "./book";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable()
export class BookService {
  baseUrl = 'https://localhost:7154/api/';

  private booksSubject: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>([]);
  public books$: Observable<Book[]> = this.booksSubject.asObservable();
  constructor(private http:HttpClient) {
  }

  initBooks(){
     this.http.get<Book[]>(this.baseUrl + 'books')
       .pipe(
         map((books:Book[]) => {
           return books.map(book => {
             return {
               ...book,
               publishingDate: new Date(book.publishingDate)
             };
           });
       })
       )
       .subscribe(res =>{
       this.booksSubject.next(res);
     })
  }

  createBook(book:Book){
    return this.http.post(this.baseUrl + 'books',book)
  }

  updateBook(book:Book){
    return this.http.put(this.baseUrl + 'books/' + book.id,book)
  }

  removeBook(id:string){
    return this.http.delete(this.baseUrl + 'books/' + id)
  }



}
