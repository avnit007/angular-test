import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from "../../interfaces/index";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})
export class ModalComponent implements OnInit {

  @Input() public customer: Customer | undefined;
  // @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter();
  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  confirm() {
    this.confirmEvent.emit();
    this.modal.close();
  }

}
