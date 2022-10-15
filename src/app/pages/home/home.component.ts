import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { Customer } from '../../interfaces/index';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  customerDetails: Customer | undefined;
  customers: Customer[] | undefined;
  allCustomers: Customer[] | undefined;
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(
    public translate: TranslateService,
    public modalService: NgbModal,
    private customerService: CustomerService,
    public SpinnerService: SpinnerService
  ) { }



  refreshCustomers() {
    this.customers =
      this.allCustomers && this.allCustomers.length > 0
        ? this.allCustomers
          .map((country: Customer, i: number) => ({ Id: i + 1, ...country }))
          .slice(
            (this.page - 1) * this.pageSize,
            (this.page - 1) * this.pageSize + this.pageSize
          )
        : this.customers;
  }

  async ngOnInit() {
    this.SpinnerService.showLoader();

    this.customerService.getCustomers().pipe(catchError((err) => {
      this.SpinnerService.hideLoader();
      throw err;
    }), tap((customerList: any) => {
      if (customerList) {
        this.customers = customerList;
        this.allCustomers = customerList;
        this.collectionSize = customerList.length;
        this.refreshCustomers();
      }
    }),
      switchMap((customerList: any) => this.customerService.checkCustomer(customerList && customerList[0]).pipe(
        tap(() => {
          this.SpinnerService.hideLoader();
        })
      )), catchError((error) => {
        this.SpinnerService.hideLoader();
        throw error;
      })
    ).subscribe(() => this.SpinnerService.hideLoader());
  }

  showDetails(customer: Customer) {
    this.customerDetails = customer;
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.customer = customer;
  }
}
