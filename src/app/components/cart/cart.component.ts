import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../cart.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  imageLoaded: boolean = false;

  constructor(
    private cartService: CartService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCart();
    this.calculateTotal();
  }

  trackByProductId(index: number, item: any): number {
    return item.id;
  }

  loadCart() {
    this.cartItems = this.cartService.getCart('cart');

    this.calculateTotal();
    this.changeDetector.markForCheck();
  }

  calculateTotal(): void {
    this.totalPrice = 0;
    let items = this.cartService.getCart('cart');
    for (const item of items) {
      this.totalPrice += item.price * item.quantity;
    }
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  addItem(item: {
    id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
  }) {
    this.cartService.addToCart(item);
    this.loadCart();
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}
