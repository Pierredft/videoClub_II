import { Time } from "@angular/common";

export default interface Product {
  id: number;
  name: string;
  actor: string;
  director: string;
  price: number;
  synopsis: string;
  duration: Time;
}
