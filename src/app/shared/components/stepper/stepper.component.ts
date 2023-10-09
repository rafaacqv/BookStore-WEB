import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DeliveryMethod } from '../../models/deliveryMethod.model';
import { CheckoutService } from 'src/app/checkout/checkout.service';
import { AccountService } from 'src/app/account/account.service';
import { SnackBarService } from 'src/app/core/material/snackbar.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit{

  constructor(private fb: FormBuilder,
              private checkoutService: CheckoutService,
              private accountService: AccountService,
              private snackBarService: SnackBarService,
              private basketService: BasketService) {}

  ngOnInit(): void {
    this.getDeliveryMethods();
    this.getAddressValues();
  }

  addressForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required]
  });

  deliveryForm = this.fb.group({
      deliveryMethod: [this.getDeliveryMethodIdValue(), Validators.required]
  })

  paymentForm = this.fb.group({
      nameOnCard: ['', Validators.required]
  });

  isLinear = true;
  deliveryMethods: DeliveryMethod[] = [];

  getDeliveryMethodIdValue() {
    return (this.basketService.shippingValue == 0) ? '' : this.basketService.shippingValue.toString();
  }

  getDeliveryMethods() {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: result => this.deliveryMethods = result
    })
  }

  getAddressValues() {
    this.accountService.getUserAddress().subscribe({
      next: address => {
        address && this.addressForm.patchValue(address);
      }
    })
  }

  saveUserAddress() {
    this.accountService.updateAddress(this.addressForm.value).subscribe({
      next: () => {
        this.snackBarService.success("Address saved!");
        this.addressForm.reset(this.addressForm.value);
      }
    })
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }

}
