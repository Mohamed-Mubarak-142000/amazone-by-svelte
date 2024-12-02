export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}