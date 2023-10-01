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
}

export class Basket implements Basket {
  id = cuid();
  items: BasketItem[] = []
}
