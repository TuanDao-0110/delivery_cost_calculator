import { RequestType } from "../model/Types";
import {
  COST_PER_ITEM_CENT,
  FEE_EACH_500,
  FREE_ITEM_AMOUNT,
  MAX_CART_VALUE,
  MAX_FEE_CENT,
  MIN_CART_VALUE,
  RUSH_HOUR_EXTRA_RATIO,
  RUSH_HOUR_MAX,
  RUSH_HOUR_MIN,
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
  //   3. add distance cost
  const travelCostRatio = Math.ceil(info.deliveryDistance / TRAVEL_DISTANCE_COUNT);
  fee += travelCostRatio * FEE_EACH_500;
  //   4. add cost base on item
  if (info.numberOfItems > FREE_ITEM_AMOUNT) {
    fee += (info.numberOfItems - FREE_ITEM_AMOUNT) * COST_PER_ITEM_CENT;
  }
  const date = new Date(info.deliveryTime);
  if (date.getHours() >= RUSH_HOUR_MIN && date.getHours() <= RUSH_HOUR_MAX) {
    fee *= RUSH_HOUR_EXTRA_RATIO;
  }
  return Math.min(fee, MAX_FEE_CENT);
};
