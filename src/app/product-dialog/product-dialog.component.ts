import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent {
  @Output() productSelected: EventEmitter<any> = new EventEmitter<any>();

  selectProduct(product: any) {
    this.productSelected.emit(product);
  }
  onProductSelected(product: any) {
    // Handle the selected product here
    console.log(product);
  }
  
}
