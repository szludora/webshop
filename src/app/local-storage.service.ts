import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  getProductById(productId: string): any {
    const products: any[] = this.getItem<any[]>('products') || [];

    for (const item of products) {
      if (item.id === Number(productId) + 1) {
        return item;
      }
    }

    return {
      id: '',
      title: '',
      description: '',
      price: -1,
      quantity: -1,
      image: '',
    };
  }
}
