export interface RequestType {
  cartValue: number;
  deliveryDistance: number;
  numberOfItems: number;
  deliveryTime: string ;
}

export interface ResponseType {
  delivery_fee: number;
}
