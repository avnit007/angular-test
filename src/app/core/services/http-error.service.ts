import { Injectable, TemplateRef } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertPopupComponent } from '../../components/alert-popup/alert-popup.component';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {
  toasts: any[] = [];

  showError(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
