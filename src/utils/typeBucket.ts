export interface Artist {
  name: string;
  bio: string;
  socials: string;
  image: string;
}

export interface Category {
  name: string;
  description: string;
}

export interface Product {
  name: string;
  description: string;
  artist_id: number;
  category_id: number;
}

export interface ProductVariation {
  product_id: number;
  size: string;
  colour: string;
  price: number;
  stock: number;
}

export interface ProductImage {
  product_id: number;
  image_url: string;
  is_main_image: number;
}

export interface User {
  username: string;
  email: string;
  hashed_password: string;
  salt: string;
  address: string;
}
