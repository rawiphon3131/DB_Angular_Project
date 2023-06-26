import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  orderList: any;
  infoOrder: { [order_id: string]: boolean } = {};
  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.fetchOrder();
  }
  fetchOrder() {
    this.http.get<any[]>('http://localhost/backend/select_order_show.php')
      .subscribe(response => {
        this.orderList = response;
      });
  }
  showInfo(order_id: number) {
    // Implement your logic here to retrieve and display the information based on cusId
    this.infoOrder[order_id] = true;
    console.log('Show info for order_id:', order_id);
    // You can open a modal or navigate to a separate page to display the information
    const data = { order_id: order_id };
    this.http.post('http://localhost/backend/get_order_details.php', data).subscribe(
      (response) => {
        console.log(response);
        // Handle the response from PHP and display the information
        sessionStorage.setItem('orderDetails', JSON.stringify(response));
      },
      (error) => {
        console.error(error);
        // Handle any errors that occur during the HTTP request
      }
    );
    this.http.post('http://localhost/backend/select_sum_order.php', data).subscribe(
      (response) => {
        console.log(response);
        // Handle the response from PHP and display the information
        sessionStorage.setItem('OrderSum', JSON.stringify(response));
      },
      (error) => {
        console.error(error);
        // Handle any errors that occur during the HTTP request
      }
    );
  }

}
