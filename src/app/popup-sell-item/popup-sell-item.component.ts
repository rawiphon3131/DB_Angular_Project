import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  prd_id: number;
  prd_name: string;
  size_name: string;
  prd_sell:string;
  prd_value:string;
  // Add other properties as needed
}

@Component({
  selector: 'app-popup-sell-item',
  templateUrl: './popup-sell-item.component.html',
  styleUrls: ['./popup-sell-item.component.css']
})
export class PopupSellItemComponent implements OnInit {
  showAddNamePd: boolean = false;
  where_pick: any[];
  product_values: any[];
  userId: string | null = null;
  successMessage: string | null = null;
  response: any[];
  
  productIds: Product[] = []; // Update with your actual product data
  searchKeyword: string = '';
  filteredProducts: Product[] = [];

  

  constructor(private http: HttpClient) {
    this.where_pick = [];
    this.product_values = [];
    this.userId = sessionStorage.getItem('user_id');
    this.response = [];
  }

  ngOnInit() {
    this.fetchProductIds();
  }

  add_products() {
    const url = 'http://localhost/backend/pick_in.php';
    const url2 = 'http://localhost/backend/update_pd.php';
  
    for (let productId in this.where_pick) {
      const product = this.productIds.find((p) => p.prd_id === parseInt(productId));
      const size_name = product ? product.size_name : '';
      const data = {
        prd_id: productId,
        where_pick: this.where_pick[productId],
        product_values: this.product_values[productId],
        size_id: productId,
        type_id: productId,
        size_name: size_name,
        userId: this.userId
      };
  
      // Make the HTTP request to the PHP server
      this.http.post(url, data, { responseType: 'text' }).subscribe(
        (response: any) => {
          // Handle the response as needed
          console.log(response);
          alert('Success! Response: ' + response); // Display an alert box with the response text
        },
        (error) => {
          // Handle the error
          console.error(error);
        }
      );
  
      this.http.post(url2, data, { responseType: 'text' }).subscribe(
        (response: any) => {
          // Handle the response as needed
          console.log(response);
         
        },
        (error) => {
          // Handle the error
          console.error(error);
        }
      );
    }
  }
  

  fetchProductIds() {
    this.http.get<any[]>('http://localhost/backend/select_sell_item.php')
      .subscribe(response => {
        this.productIds = response;
      });
  }

  searchProducts() {
    this.filteredProducts = this.productIds.filter(
      (product) =>
        product.prd_name.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );
  }
}
