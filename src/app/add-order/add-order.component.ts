
import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import 'jspdf-autotable';
import { Router } from '@angular/router';
import "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { ProductPopupComponent } from '../product-popup/product-popup.component';
import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';



declare var pdfMake: any;


import { ConfirmationService, MessageService } from 'primeng/api';


interface Product {
  prd_id: number;
  prd_name: string;
  size_name: string;
  prd_sell: string;
  prd_value: string;
  // Add other properties as needed
}
interface OrderData {
  ordd_id: number;
  prd_name: string;
  size_name: string;
  order_values: number;
  order_sum: number;
  prd_sell: number;
  cus_name: string;
  cus_adddress: string;
  cus_numtel: string;
  user_name: string;
}




@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
  providers: [ConfirmationService, MessageService, DynamicDialogRef, DynamicDialogConfig, DialogService]
})
export class AddOrderComponent implements OnInit {
 



  selectedProducts: any[] = [];
  totalSum: number = 0;

  handleProductSelected(product: any) {
    this.selectedProducts.push(product);
  }
  calculateTotalSum(): number {
    this.totalSum = this.selectedProducts.reduce((sum, product) => {
      return sum + (product.prd_sell * product.inputValue);
    }, 0);
    return this.totalSum;
  }
  
  cols: any[] = [];
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
  credit_new:string = '';
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
  pdfexCus: OrderData[] = [];

  product: any;
  typeSellOptions: any[] = [
    { label: '', value: '' },
    { label: 'เงินสด', value: '1' },
    { label: 'เครดิต', value: '2' }
  ];



  constructor(private http: HttpClient, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService, private dialogService: DialogService, public dynamicDialogRef: DynamicDialogRef, public dynamicDialogConfig: DynamicDialogConfig) {
    this.type_price = [];
    this.cus_numphone = [];
    this.typeoptions = [];
    this.customer = [];
    this.userId = sessionStorage.getItem('user_id');
    this.product_values = [];
    this.response = [];

  }
  openDialog() {
    const ref = this.dialogService.open(ProductPopupComponent, {
      header: 'Product Popup',
      width: '70%',
      data: { products: this.selectedProducts }
    });

    ref.onClose.subscribe((product: any) => {
      if (product) {
        this.selectedProducts.push(product);
      }
    });
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

    this.cols = [
      { field: "firstname", header: "First Name" },
      { field: "lastname", header: "Last Name" },
      { field: "age", header: "Age" },
    ];
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

  //   showInfo(order_id: number, cus_name: string) {
  //     const data = { order_id: order_id, cus_name: cus_name };
  //     this.http.post('http://localhost/backend/select_sum_order.php', data).subscribe(
  //       (response) => {
  //         console.log(response);
  //         // Handle the response from PHP and display the information
  //         sessionStorage.setItem('OrderSum', JSON.stringify(response));
  //       },
  //       (error) => {
  //         console.error(error);
  //         // Handle any errors that occur during the HTTP request
  //       }
  //     );
  //     this.http.post('http://localhost/backend/select_price_prd.php', data).subscribe(
  //       (response) => {
  //         console.log(response);
  //         // Handle the response from PHP and display the information
  //         sessionStorage.setItem('price_prd_id', JSON.stringify(response));
  //       },
  //       (error) => {
  //         console.error(error);
  //         // Handle any errors that occur during the HTTP request
  //       }
  //     );
  //     this.http.post('http://localhost/backend/get_order_details.php', data).subscribe(
  //       (response) => {
  //         console.log(response);
  //         // Handle the response from PHP and display the information
  //         const orderDetails = Array.isArray(response) ? response : [response]; // Ensure orderDetails is an array
  //         let html = `
  //   <h1>รายระเอียดรายการสั่งซื้อ</h1>
  //   <table style="width: 100%;">
  //     <thead>
  //       <th>ลำดับที่</th>
  //       <th>ชื่อสินค้า</th>
  //       <th>จำนวน</th>
  //       <th>ราคาขาย/ชิ้น</th>
  //       <th>ราคารวม</th>
  //     </thead>
  //     <tbody>`;
  //         let totalSum = 0;

  //         for (let i = 0; i < orderDetails.length; i++) {
  //           const orderDetail = orderDetails[i];
  //           const orderSum = parseFloat(orderDetail.order_sum); // Parse the order_sum value as a float
  //           let valuse_sum = orderDetail.prd_sell * orderDetail.order_values;
  //           html += `
  //     <tr>
  //       <td>${i + 1}</td>
  //       <td>${orderDetail.prd_name}</td>
  //       <td>${orderDetail.order_values}</td>
  //       <td>${orderDetail.prd_sell}</td>
  //       <td>${valuse_sum}</td>
  //     </tr>
  //     </tbody>`;
  //           totalSum += valuse_sum;
  //         }

  //         html += `
  //         </br>
  //     <table>
  //     <tr>
  //       <td></td>
  //       <td></td>
  //       <td></td>
  //       <td><strong>ราคารวมทั้งหมด:</strong></td>
  //       <td><strong>${formatNumber(totalSum)} บาท</strong></td>
  //     </table>
  //   </tbody>
  // </table>`;
  //         function formatNumber(number: number): string {
  //           return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //         }
  //         Swal.fire({
  //           html: html,
  //           width: '800px',
  //           showCloseButton: true,
  //           showCancelButton: false,
  //           focusConfirm: false,
  //           confirmButtonText: 'OK'
  //         });
  //       },
  //       (error) => {
  //         console.error(error);
  //         // Handle any errors that occur during the HTTP request
  //       }
  //     );
  //   }
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

        const dialogConfig: DynamicDialogConfig = {
          data: {
            orderDetails: orderDetails
          },
          header: 'รายระเอียดรายการสั่งซื้อ',
          width: '70vw',
          contentStyle: {
            'max-height': '500px',
            overflow: 'auto'
          },
          baseZIndex: 10000
        };

        const dialogRef: DynamicDialogRef = this.dialogService.open(DetailsDialogComponent, dialogConfig);
      },
      (error) => {
        console.error(error);
        // Handle any errors that occur during the HTTP request
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
    if (this.name_cus_new === '' || this.address_cus_new === '' || this.phone_cus_new == '' || this.credit_new == '') {
      this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    } else {


      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'คุณต้องการเพิ่มชื่อลูกค้าหรือไม่',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const data = { name_cus_new: this.name_cus_new, address_cus_new: this.address_cus_new, phone_cus_new: this.phone_cus_new,credit_new:this.credit_new };
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
    const data = { selectedProducts: this.selectedProducts };
    console.log(data);
    if (this.type_sell === '') {
      this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    } else {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'คุณต้องการเพิ่มรายการสั่งซื้อหรือไม่',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          const dataArray = [];
          for (const product of this.selectedProducts) {
            const { prd_id, prd_sell, inputValue } = product;
            const size_name = product.size_name;
            const data = {
              prd_id,
              prd_sell,
              product_values: inputValue,
              size_name,
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
            (error) => {
              console.log(error);
              this.messageService.add({ severity: 'error', summary: 'Warring', detail: 'เกิดข้อผิดพลาดกรุณาตรวจสอบข้อมูลให้ครบถ้วน' });
            });
          console.log(dataArray);
        }, reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Cancle', detail: 'ยกเลิกรายการสั่งซื้อ' });
        }

      });
    }
  }
  generateInvoice(orderId: number): void {




    const url2 = `http://localhost/backend/export_pdf_data.php`;
    const body2 = { order_id: orderId };

    this.http.post<OrderData[]>(url2, body2).subscribe(
      (orderData) => {
        console.log(orderData);
        const row = orderData[0]; // Assuming you have a single row of data
        invoiceContent.customer.name = row.cus_name;
        invoiceContent.customer.address = row.cus_adddress; // Corrected property name
        invoiceContent.customer.phone = row.cus_numtel; // Corrected property name
        invoiceContent.payee.userName = row.user_name;
        // Rest of the code...
      }
    );

    const invoiceContent = {
      cashBillHeader: 'บิลเงินสด',
      customer: {
        name: '',
        address: '',
        phone: ''
      },
      products: [] as any[],
      payee: {
        userName: '',
        address: '',
        email: '',
        phone: ''
      },
      total: 0
    };

    const url = `http://localhost/backend/get_order_details.php`;
    const body = { order_id: orderId };
    this.http.post<OrderData[]>(url, body).subscribe(
      (orderData) => {
        console.log(orderData);
        this.pdfexCus = orderData;
        orderData.forEach((row) => {
          pdfMake.vfs = pdfFonts.pdfMake.vfs;
          const fonts = {
            THSarabunNew: {
              normal: 'THSarabunNew.ttf',
              bold: 'THSarabunNew-Bold.ttf',
              italics: 'THSarabunNew-Italic.ttf',
              bolditalics: 'THSarabunNew-BoldItalic.ttf'
            },
            Roboto: {
              normal: 'Roboto-Regular.ttf',
              bold: 'Roboto-Medium.ttf',
              italics: 'Roboto-Italic.ttf',
              bolditalics: 'Roboto-MediumItalic.ttf'
            },
            Noto: {
              normal: 'NotoSansThai-Regular.ttf',
              bold: 'NotoSansThai-Medium.ttf',
              italics: 'NotoSansThai-SemiBold.ttf',
              bolditalics: 'NotoSansThai-Thin.ttf'
            }
          };
      
          pdfMake.fonts = fonts;
          const product = {
            description: getDescription(row),
            quantity: row.order_values,
            price: row.prd_sell,
            congratsValue: row.order_values * row.prd_sell
          };
          invoiceContent.products.push(product);

        });
        function getDescription(row: any): string {
          const prdName = row.prd_name || '';
          const sizeName = row.size_name || '';
          return `${prdName} ${sizeName}`;
        }
        const totalSum = orderData.reduce((sum, row) => sum + parseFloat(row.order_sum.toString()), 0);
        const totalSumFormatted = `${formatNumber(totalSum)}`;
        function formatNumber(number: number): string {
          const digits = [
            '', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า', 'สิบ'
          ];
          const tens = ['', 'สิบ', 'ยี่สิบ', 'สามสิบ', 'สี่สิบ', 'ห้าสิบ', 'หกสิบ', 'เจ็ดสิบ', 'แปดสิบ', 'เก้าสิบ'];

          let baht = '';
          let satang = '';

          const roundedNumber = Math.round(number);
          const bahtValue = Math.floor(roundedNumber);
          const satangValue = Math.round((roundedNumber - bahtValue) * 100);

          if (bahtValue > 0) {
            const bahtText = convertToText(bahtValue);
            baht = `${bahtText}ร้อยบาท`;
          }

          if (satangValue > 0) {
            const satangText = convertToText(satangValue);
            satang = `${satangText}สตางค์`;
          }

          return `${baht}${satang || 'ถ้วน'}`;

          function convertToText(num: number): string {
            if (num === 0) {
              return '';
            }

            if (num < 10) {
              return digits[num];
            }

            if (num === 10) {
              return 'สิบ';
            }

            if (num < 100) {
              const digit = num % 10;
              const ten = Math.floor(num / 10);

              if (ten === 1) {
                if (digit === 1) {
                  return 'เอ็ด';
                } else if (digit === 2) {
                  return 'ยี่';
                }
              }

              return `${tens[ten]}${digits[digit]}`;
            }

            if (num < 1000) {
              const hundred = Math.floor(num / 100);
              const remainder = num % 100;

              return `${digits[hundred]}ร้อย${convertToText(remainder)}`;
            }

            if (num < 10000) {
              const thousand = Math.floor(num / 1000);
              const remainder = num % 1000;

              return `${digits[thousand]}พัน${convertToText(remainder)}`;
            }

            if (num < 100000) {
              const tenThousand = Math.floor(num / 10000);
              const remainder = num % 10000;

              return `${digits[tenThousand]}หมื่น${convertToText(remainder)}`;
            }

            if (num < 1000000) {
              const hundredThousand = Math.floor(num / 100000);
              const remainder = num % 100000;

              return `${digits[hundredThousand]}แสน${convertToText(remainder)}`;
            }

            if (num < 10000000) {
              const million = Math.floor(num / 1000000);
              const remainder = num % 1000000;

              return `${digits[million]}ล้าน${convertToText(remainder)}`;
            }

            return ''; // Return empty string for numbers beyond 7 digits
          }

        }

        const VAT_PERCENTAGE = 7; // VAT percentage

        const vatAmount = totalSum * (VAT_PERCENTAGE / 100);
        const totalWithVAT = totalSum + vatAmount;
        const documentDefinition = {
          content: [

            { text: invoiceContent.cashBillHeader, style: 'header' },
            {
              columns: [
                [
                  { text: `ลูกค้า / customrt : ${invoiceContent.customer.name}`, style: 'tableStyle' },
                  { text: `เลขที่ใบเสร็จ / Bill No. :`, style: 'tableStyle' } // Replace "XYZ123" with the actual bill number
                ],
                [
                  { text: ` ที่อยู่ / Address : ${invoiceContent.customer.address}`, style: 'tableStyle' },
                  { text: `วันที่ / Date: ${new Date().toLocaleDateString()}`, style: 'tableStyle' }
                ]
              ]
            },
            {

              table: {
                headerRows: 1,
                widths: ['auto', '*', 'auto', 'auto'],
                body: [
                  [
                    { text: 'จำนวน', style: 'tableHeader' },
                    { text: 'รายการสินค้า', style: 'tableHeader' },
                    { text: 'หน่วยละ', style: 'tableHeader' },
                    { text: 'จำนวนเงิน', style: 'tableHeader' }
                  ],
                  ...invoiceContent.products.map(item => [
                    { text: item.quantity, style: 'tableCell' },
                    { text: item.description, style: 'tableCell' },
                    { text: item.price, style: 'tableCell' },
                    { text: item.congratsValue, style: 'tableCell' }
                  ]),
                  ['', { text: totalSumFormatted, style: 'currency' }, { text: 'รวมเงิน:', style: 'tableHeader' }, { text: totalSum.toFixed(2), style: 'tableCell' }],
                  ['', '', { text: 'VAT (' + VAT_PERCENTAGE + '%):', style: 'tableHeader' }, { text: vatAmount.toFixed(2), style: 'currency' }],
                  ['', '', { text: 'ราคารวมVAT', style: 'currency' }, { text: totalWithVAT.toFixed(2), style: 'tableCell' }]
                ],
                style: 'tableStyle'
              }
            },
            { text: 'ผู้ดำเนินการ', style: 'subheader' },
            { text: ` ${invoiceContent.payee.userName}`, style: 'subheader' }
          ],
          styles: {
            header: {
              fontSize: 20,
              alignment: 'center',
              margin: [0, 0, 0, 10],
              font: 'THSarabunNew'
            },
            subheader: {
              fontSize: 16,
              margin: [0, 10, 0, 5],
              font: 'THSarabunNew'
            },
            tableStyle: {
              font: 'THSarabunNew',
              fontSize: 12
            },
            tableHeader: {
              font: 'THSarabunNew'
            },
            tableCell: {
              font: 'THSarabunNew'
            },
            currency: {
              font: 'THSarabunNew'
            }
          }
        };

        pdfMake.createPdf(documentDefinition).download('invoice.pdf');

      },
      (error) => {
        console.error(error);
        // Handle any errors that occur during the HTTP request
      }
    );
  }

}

