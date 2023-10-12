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
import { LoadingService } from 'src/app/core/material/loading.service';
import { firstValueFrom } from 'rxjs';
import { OrderToCreate } from 'src/app/shared/models/order.model';

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

  cardNumberComplete = false;
  cardExpiryComplete = false;
  cardCvcComplete = false;

  cardErrors: any;

  constructor(private fb: FormBuilder,
              private checkoutService: CheckoutService,
              private accountService: AccountService,
              private snackBarService: SnackBarService,
              private basketService: BasketService,
              private router: Router,
              private loadingService: LoadingService) {}

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
        this.cardNumber.on('change', event => {
          this.cardNumberComplete = event.complete;
          if(event.error) this.cardErrors = event.error.message;
          else this.cardErrors = null;
        })

        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement?.nativeElement)
        this.cardExpiry.on('change', event => {
          this.cardExpiryComplete = event.complete;
          if(event.error) this.cardErrors = event.error.message;
          else this.cardErrors = null;
        })

        this.cardCvc = elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement?.nativeElement)
        this.cardCvc.on('change', event => {
          this.cardCvcComplete = event.complete;
          if(event.error) this.cardErrors = event.error.message;
          else this.cardErrors = null;
        })
      }
    })
  }

  async submitOrder() {
    this.loadingService.show();
    try {
      const basket = this.basketService.getCurrentBasketValue();
      if(basket == null) throw new Error("Cannot get basket");

      const createdOrder = await this.createOrder(basket);
      const paymentResult = await this.confirmPaymentWithStripe(basket);

      if(paymentResult.paymentIntent) {
        this.basketService.deleteBasket(basket);
        this.router.navigateByUrl('checkout/success')
      }
      else {
        this.snackBarService.error(paymentResult.error.message!);
      }

    }
    catch(error: any) {
      console.error(error);
      this.snackBarService.error(error.message)
    }
    finally {
      this.loadingService.hide();
    }
  }

  private async confirmPaymentWithStripe(basket: Basket | null) {
    if(!basket) throw new Error("Basket is null");
    const result = this.stripe?.confirmCardPayment(basket.clientSecret!,
            {
              payment_method: {
                card: this.cardNumber!,
                billing_details: {
                  name: this.paymentForm.controls.nameOnCard.value!,
                }
              }
            });

    if(!result) throw new Error("Problem attempting payment with stripe");
    return result;
  }

  private async createOrder(basket: Basket | null) {
    if(!basket) throw new Error("Basket is null");
    const orderToCreate = this.getOrderToCreate(basket);
    return firstValueFrom(this.checkoutService.createOrder(orderToCreate));
  }

  private getOrderToCreate(basket: Basket): OrderToCreate {
    const deliveryMethodId = this.deliveryForm.controls.deliveryMethod.value;
    const shipToAddress = this.addressForm.value as Address;

    if(!deliveryMethodId || !shipToAddress) throw new Error("Problem with your basket");

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
      next: () => console.log('Payment Intent Created'),
      error: error => this.snackBarService.error(error.message)
    });
  }

  get paymentFormComplete() {
    return this.paymentForm.valid
    && this.cardCvcComplete
    && this.cardNumberComplete
    && this.cardExpiryComplete;
  }
}
