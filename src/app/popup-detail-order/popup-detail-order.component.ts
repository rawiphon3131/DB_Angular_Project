import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-detail-order',
  templateUrl: './popup-detail-order.component.html',
  styleUrls: ['./popup-detail-order.component.css']
})
export class PopupDetailOrderComponent implements OnInit {
  orderDetails: any; // Property to store the retrieved order details
  OrderSum:any;

  ngOnInit(): void {
    // Retrieve the order details from session storage
    const storedData = sessionStorage.getItem('orderDetails');
    const storedData2 = sessionStorage.getItem('OrderSum');
    if (storedData) {
      this.orderDetails = JSON.parse(storedData);
      console.log(this.orderDetails); // Display the retrieved order details
    }
    if (storedData2) {
      this.OrderSum = JSON.parse(storedData2);
      console.log(this.OrderSum); // Display the retrieved order details
    }
  }
}
