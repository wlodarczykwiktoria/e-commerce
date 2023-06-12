export interface Products {
  chairs: Product[];
  tables: Product[];
}

export interface Product {
  name: string;
  productId: string;
  price: number;
  description: string;
  amount?: number;
  imgSource?: string;
  id: number;
}

export interface Products {
  products: Product[];
}

export interface ProductToSend {
  productId: string;
  name: string;
  price: number;
  description: string;
  imgSource?: string;
  amount: number;
}

export interface OrderInformation {
  orderInformation: OrderInformationToSend;
  id: number;
  total: number;
}

export interface OrderInformationToSend {
  address: Address;
  products: Product[];
  total: number;
}

export interface Address {
  name: string;
  surname: string;
  address: string;
  apartment: number;
  zipcode: string;
  city: string;
  phoneNumber: number;
}
