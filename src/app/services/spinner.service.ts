import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  public isLoading = false;

  public showLoader(){
    this.isLoading = true;
  }

  public hideLoader(){
    this.isLoading = false;
  }
  constructor() { }
}
