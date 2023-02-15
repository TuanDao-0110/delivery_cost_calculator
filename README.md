# Wolt Summer 2023 Engineering Internships

## Project Details:

### 1. Calculator 

1. Calculator application which can post data to back end and get delivery cost
2. Data type: 

[x] send data: 
```js
interface SubmitType {
  [index: string]: number | string | null | undefined;
  cartValue: string | number; // 4e, 5e, 6e or 4.5e, 5.5e
  deliveryDistance: string|number;// 400m, 500m, 1000m...
  numberOfItems: string |number;// integer: 1, 2, 3...
  deliveryTime: string | null;// string: 
}
```
example: 
```js
cartDetails = {
    cartValue: 900,
    deliveryDistance: 400,
    numberOfItems: 4,
    deliveryTime: "2022-09-08T14:36",
  };
```
3. Receive data: 

```js
interface ReceiveType {
  delivery_fee: number; // integer: 500, 800, 
}
```
example:
```js
{"delivery_fee": 710}
```
### 2. Restaurant List: 

1. Render list of restaurent feching from backend by using user location.
2. Data render includes:
```js
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
```
3. User get list of restaurant by access browser's location. Otherwise, in case backend service/location disble, Default values will be used. 

## Project Teachnology: 

1. Backend: Express Ts
2. Frontend: React TS, 
3. UI Framework: Tailwind.
4. Testing: Jest TS.

## Running: 
1. set up terminal in wolt