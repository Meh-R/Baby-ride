export type AuthProps = {
  firstName: string;
  lastName: string;
  adresse: string;
  postaleCode: number;
  city: string;
  email: string;
  password: string;
};

export interface CartHasProduct {
  // cart: Cart[];
  product: Product;
  quantity: number;
}

// interface Cart {}

export type LogProps = {
  email: string;
  password: string;
};

export type Product = {
  id: string;
  name: string;
  picsProduct: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  created_at: string;
  updated_at: string;
  category: { type: string };
};

export type Category = {
  id: string;
  type: string;
  picsCategory?: string;
  created_at: string;
  updated_at: string;
};
