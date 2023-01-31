import { RequestType } from "../model/Types";
import {
  COST_PER_ITEM_CENT,
  FEE_EACH_500,
  FREE_ITEM_AMOUNT,
  MAX_CART_VALUE,
  MAX_FEE_CENT,
  MIN_CART_VALUE,
  TRAVEL_DISTANCE_COUNT,
} from "../util/cost";

export const calculateDeliveryFee = (info: RequestType): number => {
  let fee = 0;
  // 1. cart value reach max 100e -> free
  if (info.cartValue >= MAX_CART_VALUE) {
    return fee;
  }
  // 2. calculate base on min cart value
  if (info.cartValue < MIN_CART_VALUE) {
      fee += MIN_CART_VALUE - info.cartValue;
    }
    console.log(fee)
  //   3. add distance cost
  if (info.deliveryDistance < TRAVEL_DISTANCE_COUNT) {
    // 3.1 if fee travel < 500
    fee += FEE_EACH_500;
  }
  const travelCostRatio = Math.ceil(info.deliveryDistance / TRAVEL_DISTANCE_COUNT);
  fee += travelCostRatio * FEE_EACH_500;
  //   4. add cost base on item
  if (info.numberOfItems > FREE_ITEM_AMOUNT) {
    fee += (info.numberOfItems - FREE_ITEM_AMOUNT) * COST_PER_ITEM_CENT;
  }

  const date = new Date(info.deliveryTime);
  if (date.getUTCHours() >= 15 && date.getUTCHours() < 19) {
    fee *= 1.2;
  }

  return Math.min(fee, MAX_FEE_CENT);
};
