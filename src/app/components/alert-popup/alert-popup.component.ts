import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { HttpErrorService } from "../../core/services/http-error.service";

@Component({
  selector: 'app-alert-popup',
  templateUrl: './alert-popup.component.html'
})
export class AlertPopupComponent implements OnInit {


  constructor(public httpErrorService: HttpErrorService) {
  }
  ngOnInit() {
  }
}
