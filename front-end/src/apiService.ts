import axios from "axios";
import { Location } from "./component/venues_list/Location";
import { SubmitType } from "./util/types";
export const getDeliveryCost = async (params: SubmitType) => {
  try {
    const { data, status } = await axios({
      method: "post",
      url: "/api/delivery_fee",
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

export const getList = async (location: Location) => {
  try {
    const { status, data } = await axios({
      method: "get",
      url: `/v1/pages/restaurants?lat=${location.latitude}&lon=${location.longitude}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    throw Error("fail fetching data");
  }
};
