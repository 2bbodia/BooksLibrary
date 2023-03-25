import { Injectable } from '@angular/core';
import * as XLSX from "xlsx";
import {saveAs} from "file-saver";
import jsPDF from "jspdf";
import {Book} from "./book";

@Injectable()
export class ExportService {
  exportBooksToExcel(books:Book[]) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(books);
    const workbook: XLSX.WorkBook = { Sheets: { ["Books"]: worksheet }, SheetNames: ["Books"] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    saveAs(file, 'books' + '.xlsx');
  }

  exportBooksToPdf(books:Book[]) {
    const doc = new jsPDF();
    const columns = ["ID", "Name", "Description", "Publishing Date", "Page Count"];
    const data = books.map(book => [book.id, book.name, book.description, book.publishingDate.toDateString(), book.pagesCount]);
    // @ts-ignore
    doc.autoTable(columns, data);
    doc.save('books.pdf');
  }
}
