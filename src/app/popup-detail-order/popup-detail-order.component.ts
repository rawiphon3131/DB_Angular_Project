import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-detail-order',
  templateUrl: './popup-detail-order.component.html',
  styleUrls: ['./popup-detail-order.component.css']
})
export class PopupDetailOrderComponent implements OnInit {
  orderDetails: any; // Property to store the retrieved order details
  OrderSum:any;
  price_prd_id:any;

  ngOnInit(): void {
    // Retrieve the order details from session storage
    const storedData = sessionStorage.getItem('orderDetails');
    const storedData2 = sessionStorage.getItem('OrderSum');
    const storedData3 = sessionStorage.getItem('price_prd_id');
    if (storedData) {
      this.orderDetails = JSON.parse(storedData);
      console.log(this.orderDetails); // Display the retrieved order details
    }
    if (storedData2) {
      this.OrderSum = JSON.parse(storedData2);
      console.log(this.OrderSum); // Display the retrieved order details
    }
    if (storedData3) {
      this.price_prd_id = JSON.parse(storedData3);
      console.log(this.price_prd_id); // Display the retrieved order details
    }
  }
}
