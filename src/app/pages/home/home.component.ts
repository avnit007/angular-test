import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
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
  pageSize = 5;
  collectionSize = 0;

  constructor(
    public translate: TranslateService,
    public modalService: NgbModal,
    private customerService: CustomerService
  ) {}

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

  getCustomers() {
    this.customerService.getCustomers().subscribe((data: any) => {
      if (data) {
        this.customers = data;
        this.customers = data;
        this.allCustomers = data;
        this.collectionSize = data.length;

        this.refreshCustomers();
      }
    });
  }

  checkCustomer(customer: Customer) {
    this.customerService.checkCustomer(customer).subscribe();
  }

  async ngOnInit() {
    this.getCustomers();
  }

  showDetails(customer: Customer) {
    this.customerDetails = customer;
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.customer = customer;

    modalRef.componentInstance.confirmEvent.subscribe(() => {
      this.checkCustomer(customer);
    });
  }
}
