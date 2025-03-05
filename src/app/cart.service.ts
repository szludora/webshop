import { Injectable } from '@angular/core';
import { Product } from './interfaces/product';
import { CartItem } from './models/cartitem/cartitem.component';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(product: Product): void {
    const cart = this.getCart();

    const existingItem = cart.find((item) => Number(item.product.id) === Number(product.id));
  
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(new CartItem(product, 1));
    }
  
    this.saveCart(cart);
  }
  
  removeFromCart(productId: number): void {
    
    let cart = this.getCart();

    const existingItem = cart.find(
      (item) => Number(item.product.id) === productId
    );

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        cart = cart.filter((item) => Number(item.product.id) !== productId);
      }
    }

    this.saveCart(cart);
    console.log(cart);
  }

  getCart(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  saveCart(cart: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem('cart');
  }
}
