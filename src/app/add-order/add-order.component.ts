
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


import { ConfirmationService, MessageService } from 'primeng/api';
interface Product {
  prd_id: number;
  prd_name: string;
  size_name: string;
  prd_sell: string;
  prd_value: string;
  // Add other properties as needed
}



@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  providers: [ConfirmationService, MessageService]
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
  paymentarry: any;

  name_cus_new: string = '';
  address_cus_new: string = '';
  phone_cus_new: string = '';

  visible: boolean = false;
  visible2: boolean = false;
  showDialog() {
    this.visible = true;
  }
  showDialog2() {
    this.visible2 = true;
  }

  exceeded: { [key: string]: boolean } = {};
  selectedOption: string = '';
  cus_address: string = '';
  typeoptions: any[];
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
  openPopcusnew: boolean = false;




  constructor(private http: HttpClient, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.type_price = [];
    this.cus_numphone = [];
    this.typeoptions = [];
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
    this.fetchOrder();
    this.filterOrders(); // Filter the orders initially
    this.selectedState = '';
    this.fetchType();
    this.fetchCustomer();
    this.fetchProductIds();

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
          let valuse_sum = orderDetail.prd_sell * orderDetail.order_values;
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
          width: '800px',
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
  parseNumber(value: any): number {
    return parseFloat(value);
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
  fetchType() {
    this.http.get<any[]>('http://localhost/backend/select_type.php')
      .subscribe(response => {
        this.typeoptions = response;
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
  send_data_succ(event: Event) {
    if(this.name_cus_new === '' || this.address_cus_new === '' || this.phone_cus_new == ''){
      this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }else{

   
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'คุณต้องการเพิ่มชื่อลูกค้าหรือไม่',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const data = { name_cus_new: this.name_cus_new, address_cus_new: this.address_cus_new, phone_cus_new: this.phone_cus_new };
        this.http.post('http://localhost/backend/add_new_cus.php', data).subscribe(
          (response: any) => {
            console.log(response);
          });
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'เพิ่มรายชื่อลูกค้าเสร็จสมบูรณ์' });
        const timeout = 2000;
        setTimeout(() => {
          location.reload();
        }, timeout);
       
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancle', detail: 'ยกเลิกการเพิ่มชื่อลูกค้า' });
      }
    });

  }
}
openAddPrdtoOrder(event: Event) {
  if (this.type_sell === '') {
    this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  } else {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'คุณต้องการเพิ่มรายการสั่งซื้อหรือไม่',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
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
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'เพิ่มรายการสั่งซื้อเสร็จสมบูรณ์' });
            const timeout = 2000;
        setTimeout(() => {
          location.reload();
        }, timeout);
          },
          (error)=>{
            console.log(error);
            this.messageService.add({ severity: 'error', summary: 'Warring', detail: 'เกิดข้อผิดพลาดกรุณาตรวจสอบข้อมูลให้ครบถ้วน' });
          });
      },reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancle', detail: 'ยกเลิกรายการสั่งซื้อ' });
      }
    
    });
  }
}
}

