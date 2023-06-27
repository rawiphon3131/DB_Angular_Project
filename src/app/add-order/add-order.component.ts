
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';




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
  showInfo(order_id: number, cus_name: string) {
    // Implement your logic here to retrieve and display the information based on cusId
    this.infoOrder[order_id] = true;
    console.log('Show info for order_id:', order_id);
    // You can open a modal or navigate to a separate page to display the information
    const data = { order_id: order_id, cus_name: cus_name };
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
    this.http.post('http://localhost/backend/select_price_prd.php', data).subscribe(
      (response) => {
        console.log(response);
        // Handle the response from PHP and display the information
        sessionStorage.setItem('price_prd_id', JSON.stringify(response));
      },
      (error) => {
        console.error(error);
        // Handle any errors that occur during the HTTP request
      }
    );
  }
  openPDF(orderId: number): void {
    const url = 'http://localhost/backend/get_order_details.php';
    const body = { order_id: orderId };
  
    this.http.post<any>(url, body).subscribe(
      (orderData) => {
        // Generate the PDF using jsPDF
        const pdf = new jsPDF.default();
        const currentDate = new Date().toLocaleDateString();
        pdf.addFont('assets/THSarabunNew.ttf', 'THSarabunNew', 'normal');
        pdf.setFont('THSarabunNew');
  
        // Customize the PDF layout and content based on the orderData
        let yOffset = 10;
        for (const order of orderData) {
          const { ordd_id, prd_name, order_values, order_sum } = order;
          pdf.text(`Order ID: ${ordd_id}`, 10, yOffset);
          pdf.text(`Product: ${prd_name}`, 10, yOffset + 10);
          pdf.text(`Order Values: ${order_values}`, 10, yOffset + 20);
          pdf.text(`Order Sum: ${order_sum}`, 10, yOffset + 30);
          pdf.text(`Date: ${currentDate}`, 10, yOffset + 40);
          yOffset += 50;
        }
  
        // Open the PDF in a new tab
        const pdfDataUri = pdf.output('datauristring');
        const targetWindow = window.open();
        if (targetWindow) {
          targetWindow.document.write('<iframe src="' + pdfDataUri + '" style="width:100%; height:100%;" frameborder="0"></iframe>');
        } else {
          console.error('Failed to open PDF in a new window.');
        }
      },
      (error) => {
        // Handle error response
        console.log(error);
      }
    );
  }
}
