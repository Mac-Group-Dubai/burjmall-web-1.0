export interface ProductImage {
  id: number;
  product_id: number;
  image_path: string;
  image_name: string;
  image_type: string;
  image_size: number;
  is_primary: boolean;
  sort_order: number;
  image_url: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  status: string;
}

export interface Brand {
  id: number;
  name: string;
  description: string;
  status: string;
}

export interface BaseUnit {
  id: number;
  name: string;
  code: string;
  description: string | null;
  status: string;
}

export interface ProductUnit {
  id: number;
  product_id: number;
  unit_id: number;
  conversion_rate: string;
  purchase_price: string | null;
  sale_price: string | null;
  unit: BaseUnit;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  category_id: number;
  brand_id: number;
  base_unit_id: number;
  price: string;
  image: string;
  type: string;
  has_installment: boolean;
  status: string;
  image_url: string;
  category: Category;
  brand: Brand;
  base_unit: BaseUnit;
  product_units: ProductUnit[];
  images: ProductImage[];
}

export interface ApiResponse {
  data: Product[];
  pagination: {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    from: number;
    to: number;
  };
}
