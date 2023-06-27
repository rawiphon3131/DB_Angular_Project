
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface Product {
  prd_id: number;
  prd_name: string;
  size_name: string;
  prd_sell: string;
  prd_value: string;
  // Add other properties as needed
}
@Component({
  selector: 'app-sell-item',
  templateUrl: './sell-item.component.html',
  styleUrls: ['./sell-item.component.css']
})
export class SellItemComponent implements OnInit {
  exceeded: { [key: string]: boolean } = {};
  selectedOption: string = '';
  cus_address: string = '';
  typeoption: any[];
  customer: any[];
  cus_numphone: any[];
  type_price: any[];
  userId: string | null = null;
  type_sell?: string;
  addOrderItemBtn: string = '';

  showAddNamePd: boolean = false;
  product_values: any[];
  successMessage: string | null = null;
  response: any[];

  productIds: Product[] = []; // Update with your actual product data
  searchKeyword: string = '';
  filteredProducts: Product[] = [];
  openPopupSell: boolean = false;
  openPopcusnew:boolean = false;

  constructor(private http: HttpClient,private router: Router) {
    this.type_price = [];
    this.cus_numphone = [];
    this.typeoption = [];
    this.customer = [];
    this.userId = sessionStorage.getItem('user_id');
    this.product_values = [];
    this.response = [];
  }
  checkExceeded(product: any) {
    const enteredValue = this.parseNumber(this.product_values[product.prd_id]);
    const prdValue = this.parseNumber(product.prd_value);
    this.exceeded[product.prd_id] = enteredValue > prdValue;
  }
  ngOnInit() {
    this.fetchType();
    this.fetchCustomer();
    this.fetchProductIds();
  }
  parseNumber(value: any): number {
    return parseFloat(value);
  }
  openAddPrdtoOrder() {
    if (this.type_sell === '') {
      // The field is not filled, display an error message or perform the necessary action
      return;
    }else{
      const dataArray = [];
      for (let productId in this.product_values) {
        const product = this.productIds.find((p) => p.prd_id === parseInt(productId));
        const size_name = product ? product.size_name : '';
        const prd_sell = product && product.prd_sell ? product.prd_sell : '';
        const data = {
          prd_id: productId,
          prd_sell: prd_sell,
          product_values: this.product_values[productId],
          size_name: size_name,
          cusId: this.selectedOption,
          selectedOption: this.selectedOption,
          customerCredit: this.getCustomerCredit(this.selectedOption),
          customerAddress: this.getCustomerAddress(this.selectedOption),
          customerNumphone: this.getCustomerNumphone(this.selectedOption),
          userId: this.userId,
          type_sell: this.type_sell,
        };
        dataArray.push(data);
      }
      const jsonData = JSON.stringify(dataArray);
      this.http.post('http://localhost/backend/bill_order.php', jsonData).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/add_order']);
        },
        (error) => {
          // Handle any errors that occur during the HTTP request
          console.error(error);
          alert('เกิดข้อผิดพลาดโปรดตรวจสอบข้อมูลให้ถูกต้อง');
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
  updateCustomerAddress() {
    // Retrieve the selected customer's address based on the cus_id
    const selectedCustomer = this.customer.find(option => option.cus_id === Number(this.selectedOption));

    if (selectedCustomer) {
      this.cus_address = selectedCustomer.cus_address;
    } else {
      this.cus_address = ''; // Set to empty if no customer is selected or found
    }
  }

  getCustomerCredit(cusId: string) {
    const customer = this.customer.find(option => option.cus_id === cusId);
    return customer ? customer.cus_credit : '';
  }

  getCustomerAddress(cusId: string) {
    const customer = this.customer.find(option => option.cus_id === cusId);
    return customer ? customer.cus_address : '';
  }

  getCustomerNumphone(cusId: string) {
    const customer = this.customer.find(option => option.cus_id === cusId);
    return customer ? customer.cus_numphone : '';
  }

  addNamecus(){
    this.openPopcusnew = true;
  }










  fetchType() {
    this.http.get<any[]>('http://localhost/backend/select_type.php')
      .subscribe(response => {
        this.typeoption = response;
      });
  }

  fetchCustomer() {
    this.http.get<any[]>('http://localhost/backend/select_customer.php')
      .subscribe(response => {
        // Remove duplicates using Set
        const uniqueCustomers = Array.from(new Set(response.map(option => option.cus_id)))
          .map(cusId => response.find(option => option.cus_id === cusId));

        this.customer = uniqueCustomers;
      });
  }

}
