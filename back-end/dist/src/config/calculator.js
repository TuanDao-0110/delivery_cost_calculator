"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDeliveryFee = void 0;
const cost_1 = require("../util/cost");
const calculateDeliveryFee = (info) => {
    let fee = 0;
    // 1. cart value reach max 100e -> free
    if (info.cartValue >= cost_1.MAX_CART_VALUE) {
        return fee;
    }
    // 2. calculate base on min cart value
    if (info.cartValue < cost_1.MIN_CART_VALUE) {
        fee += cost_1.MIN_CART_VALUE - info.cartValue;
    }
    //   3. add distance cost
    const travelCostRatio = Math.ceil(info.deliveryDistance / cost_1.TRAVEL_DISTANCE_COUNT);
    fee += travelCostRatio * cost_1.FEE_EACH_500;
    console.log(travelCostRatio);
    //   4. add cost base on item
    if (info.numberOfItems > cost_1.FREE_ITEM_AMOUNT) {
        fee += (info.numberOfItems - cost_1.FREE_ITEM_AMOUNT) * cost_1.COST_PER_ITEM_CENT;
    }
    const date = new Date(info.deliveryTime);
    if (date.getHours() >= cost_1.RUSH_HOUR_MIN && date.getHours() < cost_1.RUSH_HOUR_MAX) {
        fee *= cost_1.RUSH_HOUR_EXTRA_RATIO;
    }
    // return 100
    return Math.min(fee, cost_1.MAX_FEE_CENT);
};
exports.calculateDeliveryFee = calculateDeliveryFee;
