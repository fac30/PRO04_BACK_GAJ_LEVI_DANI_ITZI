export default interface Artist {
  name: string;
  bio: string;
  socials: string;
  image: string;
}

export default interface Category {
  name: string;
  description: string;
}

export default interface Product {
  name: string;
  description: string;
  artist_id: number;
  category_id: number;
}

export default interface ProductVariation {
  product_id: number;
  size: string;
  colour: string;
  price: number;
  stock: number;
}

export default interface ProductImage {
  product_id: number;
  image_url: string;
  is_main_image: number;
}

export default interface User {
  username: string;
  email: string;
  hashed_password: string;
  salt: string;
  address: string;
}
