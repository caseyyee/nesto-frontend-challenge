import { Product } from '@/types/nesto';

export function getBestProductsByType(products: Product[], type: 'VARIABLE' | 'FIXED'): Product[] {
  return products
    .filter(product => product.type === type)
    .sort((a, b) => a.bestRate - b.bestRate);
}

export function getBestProducts(products: Product[]) {
  return {
    variable: getBestProductsByType(products, 'VARIABLE'),
    fixed: getBestProductsByType(products, 'FIXED'),
  };
}