import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorService } from '../services/http-error.service';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private httpErrorService: HttpErrorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    return next.handle(request)
      .pipe(
        catchError(err => {
          const alertOptions = { classname: 'bg-danger text-light', delay: 5000 };
          if (err.error instanceof ErrorEvent) {
            this.httpErrorService.showError('An error occurred:' + err.error.message, alertOptions);
          } else {
            this.httpErrorService.showError(
              `error code ${err.status}, `
              + `error: ${err.message}`, alertOptions);
          }

          return throwError(
            'Something bad happened; please try again later.');
        })
      )
  }

}    