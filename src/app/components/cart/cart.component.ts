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
  }

  trackByProductId(index: number, item: any): number {
    return item.product.id;
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
    this.calculateTotal();
    this.changeDetector.markForCheck();
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  removeItem(productId: number) {
    console.log('Removing item with ID:', productId);
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  addItem(item: Product) {
    console.log('Adding item:', item);
    this.cartService.addToCart(item);
    this.loadCart();
  }

  onImageLoad() {
    this.imageLoaded = true;
  }
}
