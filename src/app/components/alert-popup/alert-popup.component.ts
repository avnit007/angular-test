import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { HttpErrorService } from "../../core/services/http-error.service";

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html',
  host: { 'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1200' }
})
export class AlertPopupComponent implements OnInit {


  constructor(public httpErrorService: HttpErrorService) {
  }
  ngOnInit() {

  }
  isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }
}
