import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import bg from "../../assets/bg.avif";

import { SubmitType, InputType, ReceiveType } from "../../util/types";
import { getDeliveryCost } from "../../apiService";
function Calculator() {
  const [submitForm, SetSubmitForm] = useState<SubmitType>({
    cartValue: "",
    deliveryDistance: "",
    numberOfItems: "",
    deliveryTime: null,
  });
  const [receiveFee, setRecieveFee] = useState<ReceiveType>({
    delivery_fee: 0,
  });

  const handleOnchange = (key: keyof SubmitType | InputType, value: SubmitType[keyof SubmitType]) => {
    SetSubmitForm((prev) => {
      return { ...prev, [key]: value };
    });
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    getDeliveryCost(submitForm).then((data) => {
      if (!(data instanceof Error)) {
        return setRecieveFee((prev) => {
          return { delivery_fee: Number((data.delivery_fee / 100).toFixed(2)) };
        });
      }
    });
  };
  const renderInput = (typeInput: keyof SubmitType) => {
    switch (typeInput) {
      case InputType.cartValue:
        return (
          <div className="relative z-0">
            <input
              required
              name={InputType.cartValue}
              value={submitForm.cartValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleOnchange(InputType.cartValue, e.currentTarget.value);
              }}
              type="number"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
            <span className="absolute inset-y-0 right-4 inline-flex items-center">euro</span>
            <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Cart Value (1e, 2.4e,...)
            </label>
          </div>
        );

      case InputType.deliveryDistance:
        return (
          <>
            <div className="relative z-0">
              <input
                required
                value={submitForm.deliveryDistance}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleOnchange(InputType.deliveryDistance, e.currentTarget.valueAsNumber);
                }}
                type="number"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <span className="absolute inset-y-0 right-4 inline-flex items-center">meter</span>
              <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Delivery DisTance (example: 400m, 590m,... )
              </label>
            </div>
          </>
        );
      case InputType.numberOfItems:
        return (
          <>
            <div className="relative z-0">
              <input
                required
                value={submitForm.numberOfItems}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleOnchange(InputType.numberOfItems, e.currentTarget.valueAsNumber);
                }}
                type="number"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <span className="absolute inset-y-0 right-4 inline-flex items-center">Item</span>
              <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Item Number
              </label>
            </div>
          </>
        );
      case InputType.deliveryTime:
        return (
          <>
            <div className="relative z-0">
              <input
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleOnchange(InputType.deliveryTime, e.currentTarget.value);
                }}
                type="datetime-local"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Select Time
              </label>
            </div>
          </>
        );
      default:
        return null;
    }
  };
  const renderForm = () => {
    let render: ReactElement[] = [];

    for (let i in submitForm) {
      render.push(
        <div key={i}>
          <label htmlFor="email" className="sr-only">
            {i}
          </label>
          <div className="relative">{renderInput(i)}</div>
        </div>
      );
    }
    return render;
  };
  return (
    <div className="App">
      <div className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Calculator Delivery Cost</h1>
            <p className="mt-4 text-gray-500"></p>
          </div>
          <form className="mx-auto mt-8 mb-0 max-w-md space-y-4" onSubmit={handleSubmit}>
            {renderForm()}
            <div className="flex items-center justify-between">
              <p className="text-md text-gray-500">
                Result:
                <a href="#" className="underline px-4 text-red-600">
                  {receiveFee.delivery_fee} Euro
                </a>
              </p>
              <button type="submit" className="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white">
                Calculate
              </button>
            </div>
          </form>
        </div>
        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img alt="Welcome" src={bg} className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
