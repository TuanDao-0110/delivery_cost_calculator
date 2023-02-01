export interface SubmitType {
  [index: string]: number | string | null | undefined;
  cartValue: string | number;
  deliveryDistance: string|number;
  numberOfItems: string |number;
  deliveryTime: string | null;
}

export interface ReceiveType {
  delivery_fee: number;
}
export enum InputType {
  cartValue = "cartValue",
  deliveryDistance = "deliveryDistance",
  numberOfItems = "numberOfItems",
  deliveryTime = "deliveryTime",
}
