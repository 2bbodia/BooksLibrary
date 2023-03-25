import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Book} from "../book";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{

    form!:FormGroup;
    @Input() book:Book|null = null;
    @Input() title:string = '';
    @Output() submit = new EventEmitter<Book>();
    @Output() cancel = new EventEmitter<any>();
    modal:NgbModalRef|null = null;
    @ViewChild("content") content!:TemplateRef<any>;


  constructor(private modalService: NgbModal, private fb:FormBuilder) {}

  ngOnInit(): void {
        this.createForm();
    }

  createForm(){
    this.form = this.fb.group({
      name:[this.book?.name,[Validators.required]],
      publishingDate:[this.book?.publishingDate,[Validators.required]],
      description:[this.book?.description,Validators.required],
      pagesCount:[this.book?.pagesCount,Validators.required]
    });
  }

  onCancelClick(){
    this.closeModal();
    this.cancel.emit();
  }
  onSubmitClick(){
    this.submit.emit(this.form.value)
    this.closeModal();
    this.createForm()
  }
  closeModal(){
    this.modal?.close();
  }

  openModal() {
   this.modal =  this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' })
  }


}
