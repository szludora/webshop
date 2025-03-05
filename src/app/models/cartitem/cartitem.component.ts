import { Product } from '../../interfaces/product';

export class CartItem {
  constructor(public product: Product, public quantity: number) {}

  getTotal(): number {
    return this.product.price * this.quantity;
  }
}
