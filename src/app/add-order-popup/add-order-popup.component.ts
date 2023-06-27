import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Product {
  prd_id: number;
  prd_name: string;
  size_name: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-add-order-popup',
  templateUrl: './add-order-popup.component.html',
  styleUrls: ['./add-order-popup.component.css']
})
export class AddOrderPopupComponent implements OnInit {
  showAddNamePd: boolean = false;
  where_pick: any[];
  product_values: any[];
  userId: string | null = null;
  successMessage: string | null = null;
  response: any[];
  productIds: Product[] = []; // Update with your actual product data

  constructor(private http: HttpClient) {
    this.where_pick = [];
    this.product_values = [];
    this.userId = sessionStorage.getItem('user_id');
    this.response = [];

  }

  ngOnInit():void {
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
    this.http.get<any[]>('http://localhost/backend/select2.php')
      .subscribe(response => {
        this.productIds = response;
      });
  }

  
}
