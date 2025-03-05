import { Injectable } from '@angular/core';
import { Product } from './interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  addToCart(product: {
    id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  }): void {
    const cart = this.getCart('cart');

    const existingItem = cart.find(
      (item: {
        id: string;
        title: string;
        description: string;
        price: number;
        quantity: number;
        image: string;
      }) => Number(item.id) === Number(product.id)
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      let newProduct: Product = {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        image: product.image,
      };
      cart.push(newProduct);
    }

    this.saveCart('cart', cart);
  }

  removeFromCart(productId: string) {
    let cart = this.getCart('cart');

    const existingItem = cart.find(
      (item: {
        id: string;
        title: string;
        description: string;
        price: number;
        quantity: number;
        image: string;
      }) => item.id === productId
    );

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        cart = cart.filter(
          (item: {
            id: string;
            title: string;
            description: string;
            price: number;
            quantity: number;
            image: string;
          }) => item.id !== productId
        );
      }
    }

    this.saveCart('cart', cart);
  }

  getCart(key: string) {
    const cart = localStorage.getItem(key);
    return cart ? JSON.parse(cart) : [];
  }

  saveCart(key: string, cart: Product[]): void {
    localStorage.setItem(key, JSON.stringify(cart));
  }

  clearCart(): void {
    localStorage.removeItem('cart');
  }
}
