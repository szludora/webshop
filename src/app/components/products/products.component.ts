import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from '../../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network error!');
        }
        return response.json();
      })
      .then((data: Product[]) => {
        this.products = data;
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    console.log('Kosárba téve:', product);
  }
}
