import axios from "axios";
import { SubmitType } from "./util/types";
export const getDeliveryCost = async (params: SubmitType) => {
  try {
    const { data, status } = await axios({
      method: "post",
      url: "http://localhost:4000/api/delivery_fee",
      headers: {
        "Content-Type": "application/json",
      },
      data: { cartDetails: { ...params, cartValue: (params.cartValue as number) * 100 } },
    });
    if (status === 200) {
      return data;
    } else {
      throw Error;
    }
  } catch (error) {
    return error;
  }
};

export const getList = async () => {
  try {
    const { data, status } = await axios({
      method: "get",
      url: "https://cors-anywhere.herokuapp.com/https://restaurant-api.wolt.com/v1/pages/restaurants?lat=60.170187&lon=24.930599",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    // const data = fetch("https://cors-anywhere.herokuapp.com/https://restaurant-api.wolt.com/v1/pages/restaurants?lat=60.170187&lon=24.930599", {
    //   // headers:
    //   method: "get",
    // })
    //   .then((data) => {
    //     data.json();
    //   })
    //   .then((res) => {
    //     res
    //   });
    // console.log(data);
  } catch (error) {
    return error;
  }
};
