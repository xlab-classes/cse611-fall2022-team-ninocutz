import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustomerSignupModel } from 'src/app/core/models/customer-signup.model';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [MessageService],
})
export class SignUpComponent implements OnInit {
  customer: CustomerSignupModel;

  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.customer = new CustomerSignupModel();
  }

  disableSubmit(): boolean {
    return (
      !this.customer.firstName ||
      !this.customer.lastName ||
      !this.customer.address ||
      !this.customer.zipCode ||
      !this.customer.emailId ||
      !this.customer.mobileNumber
    );
  }

  submitClicked() {
    this.dataService.customerSignup(this.customer).subscribe(() => {
      this.customer = new CustomerSignupModel();
      this.showSuccessMessage();
    });
  }

  showSuccessMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Signed up for notifications',
    });
  }
}
