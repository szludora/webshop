import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from '../../cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: any;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  async fetchProducts() {
    
    try {
      fetch('https://fakestoreapi.com/products')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network error!');
          }
          return response.json();
        })

        .then((data) => {
          let list = [];
          for (const item of data) {
            (item.quantity = 1), list.push(item);
            
          }
          this.products = list;
          localStorage.setItem('products', JSON.stringify(list));
        })
        .catch((error) => {
          console.error('Error', error);
        });
    } catch {
      console.log('error');
    }
  }

  addToCart(product: {
    id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  }): void {
    
    this.cartService.addToCart(product);
  }

  navigateToPath(index: number, event: Event) {
    const target = event.target as HTMLElement;

    if (target && !target.classList.contains('btn')) {
      let current = this.products[index];
      localStorage.setItem('current', JSON.stringify(current));
      let url = ['products', index.toString()];
      this.router.navigate(url);
    }
  }
}
