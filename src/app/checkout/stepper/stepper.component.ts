import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DeliveryMethod } from '../../shared/models/deliveryMethod.model';
import { CheckoutService } from 'src/app/checkout/checkout.service';
import { AccountService } from 'src/app/account/account.service';
import { SnackBarService } from 'src/app/core/material/snackbar.service';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from '../../shared/models/basket.model';
import { Address } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement,
         StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit{
  @ViewChild('cardNumber') cardNumberElement?: ElementRef;
  @ViewChild('cardExpiry') cardExpiryElement?: ElementRef;
  @ViewChild('cardCvc') cardCvcElement?: ElementRef;

  stripe: Stripe | null = null;
  cardNumber?: StripeCardNumberElement;
  cardExpiry?: StripeCardExpiryElement;
  cardCvc?: StripeCardCvcElement;

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
    this.loadStripe();
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

  loadStripe() {
    loadStripe('pk_test_51NzVFFHNhwVdWQqAlCisPWSJ2DPXo9zCyHAxl9CWZpVNeQd2DQfRkwItH10ylnBM1HJGt4sI0ajImkx2CLA6PPmR00uKkqz8nU').then(stripe => {
      this.stripe = stripe;
      const elements = stripe?.elements()

      if(elements) {
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement?.nativeElement)

        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement)

        this.cardCvc = elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement)
      }
    })
  }

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

  createPaymentIntent() {
    this.basketService.createPaymentIntent().subscribe({
      next: () => this.snackBarService.success("Payment Intention Created"),
      error: error => this.snackBarService.error(error.message)
    });
  }
}
