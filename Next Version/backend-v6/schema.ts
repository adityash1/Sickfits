import type { Lists } from ".keystone/types";

import { User } from "./schemas/User";
import { Product } from "./schemas/Product";
import { ProductImage } from "./schemas/ProductImage";

export const lists: Lists = {
  User,
  Product,
  ProductImage,
};
