
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  orderList: any;
  paybl: any;
  infoOrder: { [order_id: string]: boolean } = {};
  filteredOrders: any[] = [];
  selectedState: string = '';

  orderDetails: any; // Property to store the retrieved order details
  OrderSum: any;
  price_prd_id: any;
  paymentarry:any;

  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    this.fetchOrder();
    this.filterOrders(); // Filter the orders initially
    this.selectedState = '';


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


  fetchOrder() {
    this.http.get<any[]>('http://localhost/backend/select_order_show.php')
      .subscribe(response => {
        this.orderList = response;
      });
  }
  filterOrders() {
    if (this.selectedState === '') {
      this.filteredOrders = this.orderList;
    } else {
      this.filteredOrders = this.orderList.filter((order: any) => order.state_name === this.selectedState);
    }
  }
  pay(order_id: number, cus_id: string, cus_name: string) {
    const data = { order_id: order_id, cus_name: cus_name };
    
    this.http.post<any>('http://localhost/backend/select_blpay.php', data).subscribe(
      (response) => {
        console.log(response);
        // Handle the response from PHP and display the information
        sessionStorage.setItem('OrderSums', JSON.stringify(response));
        this.paymentarry = response;
        const orderSum = response[0].order_sum; // Access the order_sum value from the first item in the response array
        if (orderSum !== undefined) {
          Swal.fire({
            title: 'ชำระเงินที่ค้างชำระ',
            html: `คุณ ${cus_name} ยอดค้างชำระ: <span style="color: red;">${orderSum} </span> บาท`,
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            inputValidator: (value: string): Promise<string | null> => {
              return new Promise((resolve) => {
                if (!value || Number(value) > orderSum) {
                  resolve('กรอกจำนวนไม่ถูกต้อง หรือ เกินจำนวนกรุณาตรวจสอบอีกครั้ง');
                } else {
                  resolve(null);
                }
              });
            }
          }).then((result) => {
            if (result.isConfirmed) {
              const paymentAmount = result.value; // Get the payment amount from the Swal input
          
              // Check if paymentAmount is valid
              if (!paymentAmount || Number(paymentAmount) > orderSum) {
                Swal.fire({
                  title: 'กรอกจำนวนไม่ถูกต้อง หรือ เกินจำนวนกรุณาตรวจสอบอีกครั้ง',
                  text: 'โปรดกรอกข้อมูล.',
                  icon: 'error'
                });
                return;
              }
              if (Number(paymentAmount) != orderSum) {
                const data = { order_id: order_id,
                  cus_id:cus_id, 
                  cus_name: cus_name, 
                  payment_amount: paymentAmount,
                box_arryforpayment:this.paymentarry };
                let playment_total = orderSum-paymentAmount;
                this.http.post('http://localhost/backend/payment.php', data).subscribe(
                  (response) => {
                    console.log(response);
                    // Handle the response from PHP
                  },
                  (error) => {
                    console.error(error);
                    // Handle any errors that occur during the HTTP request
                  }
                );
            
                Swal.fire({
                  title: 'ชำระเงินเสร็จสิ้น',
                  html : `ชำระเงินจำนวน <span style="color:green;">${paymentAmount}</span> บาท เสร็จสมบูรณ์ ยอดค้างชำระคงเหลือ <span style="color:red;">${playment_total}</span> บาท.`,
                  icon: 'success'
                });
              }
              if (Number(paymentAmount) == orderSum) {
                const data = { order_id: order_id,
                  cus_id:cus_id, 
                  cus_name: cus_name, 
                  payment_amount: paymentAmount,
                box_arryforpayment:this.paymentarry };
                let playment_total = orderSum-paymentAmount;
                this.http.post('http://localhost/backend/payment2.php', data).subscribe(
                  (response) => {
                    console.log(response);
                    // Handle the response from PHP

                    
                  },
                  (error) => {
                    console.error(error);
                    // Handle any errors that occur during the HTTP request
                  }
                );
            
                Swal.fire({
                  title: 'ชำระเงินเสร็จสิ้น',
                  html : `ชำระเงินจำนวน <span style="color:green;">${paymentAmount}</span> บาท เสร็จสมบูรณ์ ยอดค้างชำระคงเหลือ <span style="color:red;">${playment_total}</span> บาท.`,
                  icon: 'success'
                }).then(() => {
                  location.reload();
                });
              }
            }
          });
          
          
        } else {
          // Handle the case when 'order_sum' is not present in the response
          console.error('Invalid response: order_sum is missing');
        }
      },
      (error) => {
        console.error(error);
        // Handle any errors that occur during the HTTP request
      }
    );
    console.log('Show info for order_id:', order_id);
    console.log('Show info for cus_name:', cus_id);
    console.log('Show info for cus_name:', cus_name);
  }
  
  
  
  showInfo(order_id: number, cus_name: string) {
    const data = { order_id: order_id, cus_name: cus_name };
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
    this.http.post('http://localhost/backend/get_order_details.php', data).subscribe(
      (response) => {
        console.log(response);
        // Handle the response from PHP and display the information
        const orderDetails = Array.isArray(response) ? response : [response]; // Ensure orderDetails is an array
        let html = `
  <h1>รายระเอียดรายการสั่งซื้อ</h1>
  <table style="width: 100%;">
    <thead>
      <th>ลำดับที่</th>
      <th>ชื่อสินค้า</th>
      <th>จำนวน</th>
      <th>ราคาขาย/ชิ้น</th>
      <th>ราคารวม</th>
    </thead>
    <tbody>`;
        let totalSum = 0;
        
        for (let i = 0; i < orderDetails.length; i++) {
          const orderDetail = orderDetails[i];
          const orderSum = parseFloat(orderDetail.order_sum); // Parse the order_sum value as a float
          let valuse_sum = orderDetail.prd_sell*orderDetail.order_values;
          html += `
    <tr>
      <td>${i + 1}</td>
      <td>${orderDetail.prd_name}</td>
      <td>${orderDetail.order_values}</td>
      <td>${orderDetail.prd_sell}</td>
      <td>${valuse_sum}</td>
    </tr>
    </tbody>`;
    totalSum += valuse_sum;
        }
        
        html += `
        </br>
    <table>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td><strong>ราคารวมทั้งหมด:</strong></td>
      <td><strong>${formatNumber(totalSum)} บาท</strong></td>
    </table>
  </tbody>
</table>`;
function formatNumber(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
        Swal.fire({
          html: html,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText: 'OK'
        });
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
