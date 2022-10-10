import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorService } from '../services/http-error.service';
import { SpinnerService } from 'src/app/services/spinner.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private httpErrorService: HttpErrorService, private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    return next.handle(request)
      .pipe(
        catchError(err => {
          this.spinnerService.hideLoader();
          const alertOptions = { classname: 'bg-danger text-light', delay: 5000 };
          if (err.error instanceof ErrorEvent) {
            this.httpErrorService.showAlert('An error occurred:' + err.error.message, alertOptions);
          } else {
            this.httpErrorService.showAlert(
              `${err && err.error && typeof err.error == "string" ? err.error : err.message}`, alertOptions);
          }

          return throwError(
            'Something bad happened; please try again later.');
        })
      )
  }

}    