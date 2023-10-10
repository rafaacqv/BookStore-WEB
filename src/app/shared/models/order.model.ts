import { Address } from "./user.model";

export interface OrderToCreate {
  basketId: string;
  deliveryMethodId: string;
  shipToAddress: Address;
}

export interface Order {
  id: number;
  buyerEmail: string;
  orderDate: string;
  shipToAddress: Address;
  deliveryMethod: string;
  shippingPrice: number;
  orderItems: OrderItem[];
  subtotal: number;
  total: number;
  status: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  imageUrl: string;
  price: number;
  quantity: number;
}
