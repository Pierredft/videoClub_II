interface Format {
  id: number;
  name: string;
}

export default interface Product {
  id: number;
  name: string;
  actor: string;
  director: string;
  price: number;
  synopsis: string;
  // duration: Date;
  img: string;
  popular: boolean;
  format : Format;
}
