import * as cuid from "cuid";

export interface BasketItem {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
  format: string;
}

export interface Basket {
  id: string;
  items: Array<BasketItem>;
  clientSecret?: string;
  paymentIntentId?: string;
  deliveryMethodId?: number;
  shippingPrice: number;
}

export class Basket implements Basket {
  id = cuid();
  items: BasketItem[] = []
  shippingPrice = 0;
}

export interface BasketTotals {
  shipping: number;
  subtotal: number;
  total: number;
}
