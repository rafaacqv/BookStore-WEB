import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DeliveryMethod } from '../../shared/models/deliveryMethod.model';
import { CheckoutService } from 'src/app/checkout/checkout.service';
import { AccountService } from 'src/app/account/account.service';
import { SnackBarService } from 'src/app/core/material/snackbar.service';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from '../../shared/models/basket.model';
import { Address } from '../../shared/models/user.model';
import { Router } from '@angular/router';

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
              private basketService: BasketService,
              private router: Router) {}

  ngOnInit(): void {
    this.getDeliveryMethods();
    this.getDeliveryMethodValue();
    this.getAddressValues();
  }

  isLinear = true;
  deliveryMethods: DeliveryMethod[] = [];

  addressForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required]
  });

  deliveryForm = this.fb.group({
      deliveryMethod: ['', Validators.required]
  })

  paymentForm = this.fb.group({
      nameOnCard: ['', Validators.required]
  });

  submitOrder() {
    const basket = this.basketService.getCurrentBasketValue();
    if(!basket) return;

    const orderToCreate = this.getOrderToCreate(basket);
    if(!orderToCreate) return;

    this.checkoutService.createOrder(orderToCreate).subscribe({
      next: order => {
        this.snackBarService.success('Order created successfully');
        this.basketService.deleteLocalBasket();
        this.router.navigateByUrl('checkout/success')
      }
    })
  }

  private getOrderToCreate(basket: Basket) {
    const deliveryMethodId = this.deliveryForm.controls.deliveryMethod.value;
    const shipToAddress = this.addressForm.value as Address;

    if(!deliveryMethodId || !shipToAddress) return;

    return {
      basketId: basket.id,
      deliveryMethodId: deliveryMethodId,
      shipToAddress: shipToAddress
    }
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

  getDeliveryMethodValue() {
    const basket = this.basketService.getCurrentBasketValue();
    if(basket && basket.deliveryMethodId) {
      this.deliveryForm.controls.deliveryMethod.patchValue(basket.deliveryMethodId.toString());
    }
  }

  setShippingPrice(deliveryMethod: DeliveryMethod) {
    this.basketService.setShippingPrice(deliveryMethod);
  }
}
