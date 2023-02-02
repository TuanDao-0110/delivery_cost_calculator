import React, { ReactComponentElement, ReactElement, useEffect, useState } from "react";
import { getList } from "../../apiService";
import data from "./data.json";
import bg from "../../assets/bg.avif";
import { MemoizedFoodTag } from "./FoodTag";
type IconType = "🚚" | "⭐" | "🕛" | "🛣";
enum SortableItemId {
  deliveryPrice = "delivery-price",
  rating = "rating",
  deliveryestimate = "delivery-estimate",
  distance = "distance",
}
interface VenuesType {
  [any: string]: any;
  address: string;
  delivery_price: string;
  id: string;
  rating?: { rating: number; score: number };
  tags: Array<string>;
  name: string;
  short_description: string;
}
interface ImageType {
  url: string;
}
interface StateType {
  like: boolean;
  venue: VenuesType;
  image: ImageType;
}
export const VenuesList = () => {
  const [listRestaurants, setListRestaurants] = useState<StateType[]>([] as StateType[]);
  const [load, setLoad] = useState<number>(15);
  const img: string = new URL(`../../assets/bg.avif`, import.meta.url).href;

  useEffect(() => {
    getList();
    setListRestaurants((prev) => {
      return [...createListRestaurant(data.sections[1].items as unknown as StateType[])];
    });
  }, [load]);
  const createListRestaurant = (newData: StateType[]) => {
    let newList: StateType[];

    if (listRestaurants.length) {
      newList = [...listRestaurants];
    } else {
      newList = [];
    }
    for (let i of newData.slice(0, load)) {
      const { image, venue } = i;
      if (newList.findIndex((e) => e.venue.id === venue.id) === -1) {
        newList.push(Object.assign({}, { image, venue, like: false }));
      }
    }
    return newList;
  };
  const handleLoadMore = () => {
    setLoad((prev) => {
      return (prev += 5);
    });
  };
  const renderRestaurent = (restaurantArray: typeof listRestaurants) => {
    return restaurantArray.map((item, index) => {
      const { venue, image, like } = item;
      return (
        <div key={index} className="lg:flex items-center justify-center w-7/12 sticky top-0">
          <div
            tabIndex={0}
            aria-label="card 1"
            className="focus:outline-none lg:w-7/12 lg:mr-7 lg:mb-0 mb-7 bg-white dark:bg-gray-800  p-6 shadow-red-600 rounded-md"
          >
            <div className="flex items-center border-b border-gray-200 dark:border-gray-700  pb-6">
              <img src={image.url} alt="coin avatar" className="w-12 h-12 rounded-full" />
              <div className="flex items-start justify-between w-full">
                <div className="pl-3 w-full">
                  <p tabIndex={0} className="focus:outline-none text-xl font-medium leading-5 text-gray-800 dark:text-white ">
                    {venue.name}
                  </p>
                  <div tabIndex={0} className="focus:outline-none text-sm leading-normal pt-2 text-gray-500 dark:text-gray-200 ">
                    {/* 36 members */}
                    <p className="text-red-300">🏢 {venue.address}</p>
                    <p className="text-red-300">🚚 {venue.delivery_price}</p>
                    <p className="text-red-300">⭐ {venue?.rating?.rating}</p>
                  </div>
                </div>
                <div
                  role="img"
                  aria-label="bookmark"
                  className="cursor-pointer "
                  onClick={() => {
                    handleLike(venue.id, listRestaurants);
                  }}
                >
                  <svg
                    className="focus:outline-none dark:text-gray-200 text-gray-800 hover:text-rose-300 "
                    width={28}
                    height={28}
                    viewBox="0 0 28 28"
                    fill={like ? "green" : ""}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="px-2">
              <p tabIndex={0} className="focus:outline-none text-sm leading-5 py-4 text-gray-600 dark:text-gray-200 ">
                {venue.short_description}
              </p>
              <div tabIndex={0} className="focus:outline-none flex gap-1 capitalize">
                {/* {renderTags(venue.tags)} */}
                <MemoizedFoodTag tag={venue.tags} />
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  const handleLike = (id: string, listRestaurants: StateType[]) => {
    let index = listRestaurants.findIndex((i) => i.venue.id === id);
    setListRestaurants((prev) => {
      let temp = listRestaurants;
      temp[index].like = true;
      return [...temp];
    });
  };
  return (
    <div
      aria-label="group of cards"
      tabIndex={0}
      style={{ backgroundImage: `require('../../assets/bg.avif')`, backgroundSize: "100%" }}
      className="relative focus:outline-none py-8 w-full flex justify-center items-center gap-5 flex-col "
    >
      <h1 className="text-6xl text-cyan-500">Wolt Restaurant list</h1>
      {renderRestaurent(listRestaurants)}
      <button onClick={handleLoadMore} className="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
        Load more 🍽 -{load}
      </button>
    </div>
  );
};
