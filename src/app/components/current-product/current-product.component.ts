import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../cart.service';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../local-storage.service';
@Component({
  selector: 'app-current-product',
  templateUrl: './current-product.component.html',
  styleUrls: ['./current-product.component.scss'],
  imports: [CommonModule],
})
export class CurrentProductComponent implements OnInit {
  constructor(
    private localStorage: LocalStorageService,
    private route: ActivatedRoute
  ) {}

  item?: {
    id: '',
    title: '',
    description: '',
    price: -1,
    quantity: -1,
    image: '',
  };

  ngOnInit(): void {
    this.getCurrentItem();    
  }

  getCurrentItem() {
    const productId = this.route.snapshot.paramMap.get('id');
      this.item = this.localStorage.getProductById(productId? productId : '1');
  }
}
