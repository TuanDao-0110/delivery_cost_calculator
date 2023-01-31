import { describe, test, expect } from "@jest/globals";
import { calculateDeliveryFee } from "../src/config/calculator";
import { RequestType } from "../src/model/Types";
describe("checking value", () => {
  const cartDetails = {
    cartValue: 900,
    deliveryDistance: 400,
    numberOfItems: 4,
    deliveryTime: "2021-10-12T13:00:00Z",
  };
  test("cart details with simple lowest cost", () => {
    expect(calculateDeliveryFee(cartDetails)).toBe(300);
  });

  const cartDetails1: RequestType = {
    cartValue: 1100,
    deliveryDistance: 400,
    numberOfItems: 4,
    deliveryTime: "2021-10-12T13:00:00Z",
  };
  test("cart details with cart value > min value", () => {
    expect(calculateDeliveryFee(cartDetails1)).toBe(200);
  });

  const cartDetails2: RequestType = {
    cartValue: 10000,
    deliveryDistance: 400,
    numberOfItems: 4,
    deliveryTime: "2021-10-12T13:00:00Z",
  };
  test("cart details with cart value with max", () => {
    expect(calculateDeliveryFee(cartDetails2)).toBe(0);
  });
  const cartDetails3: RequestType = {
    cartValue: 1000,
    deliveryDistance: 400, //100
    numberOfItems: 5, // 50
    deliveryTime: "2021-10-12T13:00:00Z",
  };
  test("cart details with number item > 4 ", () => {
    expect(calculateDeliveryFee(cartDetails3)).toBe(250);
  });
  const cartDetails4: RequestType = {
    cartValue: 1000,
    deliveryDistance: 400, //100
    numberOfItems: 5, // 50
    deliveryTime: "2021-10-12T16:00:00Z",
  };
  test("cart details in rush hour ", () => {
    expect(calculateDeliveryFee(cartDetails4)).toBe(300);
  });

  const cartDetails5: RequestType = {
    cartValue: 8500,
    deliveryDistance: 3400, //100
    numberOfItems: 25, // 50
    deliveryTime: "2021-10-12T16:00:00Z",
  };
  test("cart details reach max delivery cost when cart value < min 1000 cent ", () => {
    expect(calculateDeliveryFee(cartDetails5)).toBe(1500);
  });
  const cartDetails6: RequestType = {
    cartValue: 1500,
    deliveryDistance: 3400, //100
    numberOfItems: 25, // 50
    deliveryTime: "2021-10-12T16:00:00Z",
  };
  test("cart details reach max delivery cost when cart value > min 1000 cent ", () => {
    expect(calculateDeliveryFee(cartDetails6)).toBe(1500);
  });
});
