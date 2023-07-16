import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-popup',
  templateUrl: './product-popup.component.html',
  styleUrls: ['./product-popup.component.css']
})
export class ProductPopupComponent implements OnInit {
  exceeded: { [key: string]: boolean } = {};
  products: any[];
  product_values: any[];
  productIds:any;
  selectedProducts:any;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig, private http: HttpClient) {
    this.products = [];
    this.product_values = [];
  }

  addProducts() {
    // Handle the selected products and pass them back to the main component
    this.ref.close(this.selectedProducts);
  }

  ngOnInit() {
    this.products = this.config.data.products;
    this.fetchProductIds();
  }

  selectProduct(product: any) {
    const inputValue = this.product_values[product.prd_id];
  const productWithInput = { ...product, inputValue };
  this.ref.close(productWithInput);
    console.log(productWithInput);
  }

  closeDialog() {
    this.ref.close();
  }

  fetchProductIds() {
    this.http.get<any[]>('http://localhost/backend/select_sell_item.php')
      .subscribe(response => {
        this.productIds = response;
      });
  }

  parseNumber(value: any): number {
    return parseFloat(value);
  }

  checkExceeded(product: any) {
    const enteredValue = this.parseNumber(this.product_values[product.prd_id]);
    const prdValue = this.parseNumber(product.prd_value);
    this.exceeded[product.prd_id] = enteredValue > prdValue;
  }
}
