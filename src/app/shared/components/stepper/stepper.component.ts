import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DeliveryMethod } from '../../models/deliveryMethod.model';
import { CheckoutService } from 'src/app/checkout/checkout.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit{

  constructor(private fb: FormBuilder, private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: result => this.deliveryMethods = result
    })
  }

  addressForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required]
  });

  deliveryForm = this.fb.group({
      deliveryMethod: ['1']
  })

  paymentForm = this.fb.group({
      nameOnCard: ['', Validators.required]
  });

  isLinear = true;
  deliveryMethods: DeliveryMethod[] = [];

}
