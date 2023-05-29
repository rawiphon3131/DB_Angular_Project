import { Component } from '@angular/core';

@Component({
  selector: 'app-pickin-product',
  templateUrl: './pickin-product.component.html',
  styleUrls: ['./pickin-product.component.css']
})
export class PickinProductComponent {
  showAddOrderPopup: boolean = false;
  // Your table data and other variables

  openAddOrderPopup() {
    this.showAddOrderPopup = true;
  }

  onOrderAdded(newOrder: any) {

    this.showAddOrderPopup = false;
  }
}
