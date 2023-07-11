import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Producte {
  prd_id: number;
  prd_name: string;
  prd_price_pickin: string;
  size_name: string;
  // Add other properties as needed
}
interface Products {
  name: string;
  size: string;
  type_prd_name: string;
  type_name: string;
  where: string;
  value_new: string;
  price_in: string;
  price_sell: string;
  userId: any;
  formattedDatePcc: any;
}
@Component({
  selector: 'app-pickin-product',
  templateUrl: './pickin-product.component.html',
  styleUrls: ['./pickin-product.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class PickinProductComponent implements OnInit {
  showAddOrderPopup: boolean = false;
  showAddnamePDPopup: boolean = false;
  value_pd: any;


  showAddNamePd: boolean = false;
  where_pick: any[];
  product_values: any[];
  userId: string | null = null;
  successMessage: string | null = null;
  response: any[];
  productIds: Producte[] = []; // Update with your actual product data
  date: { [key: string]: Date } = {};
  formattedDate: string = '';
  onDateChange(event: any, prdId: string): void {
    this.date[prdId] = event; // Assign the selected date to the corresponding prdId key
  }

  name_new_pd!: string;
  size_name_new!: string;
  where_pick_pd!: string;
  value_new!: string;
  selectedOption!: string;
  type_name!: string;
  price_in!: string;
  price_sell!: string;

  productss: Products[] = [];
  type_prd: any[];
  typeoption: any[];
  date2: Date | undefined;
  formattedDate2: string = '';
  onDateChange2(event: any): void {
    this.formattedDate2 = formatDate(event, 'yyyy-MM-dd', 'en');
  }

  // Your table data and other variables
  products: any[] = [];
  visible: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;
  showDialog() {
    this.visible = true;
  }
  showDialog3() {
    this.visible3 = true;
  }
  constructor(private http: HttpClient, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.where_pick = [];
    this.product_values = [];
    this.userId = sessionStorage.getItem('user_id');
    this.response = [];
    this.type_prd = [];
    this.typeoption = [];

  }

  showInfo(prd_id: number, size_name: string) {
    console.log(prd_id);
  }
  ngOnInit() {
    this.fetchProducts();
    this.fetchProductotal();
    this.fetchProductIds();
    this.fetchType();
    this.fetchProductotal2();
  }
  add_new_products() {
    if (this.name_new_pd && this.size_name_new) {
      const product: Products = {
        name: this.name_new_pd,
        size: this.size_name_new,
        type_prd_name: this.selectedOption,
        type_name: this.type_name,
        where: this.where_pick_pd,
        value_new: this.value_new,
        price_in: this.price_in,
        price_sell: this.price_sell,
        userId: this.userId,
        formattedDatePcc: this.formattedDate2
      };

      // Store the product in the products array
      this.productss.push(product);

      // Reset the input fields
      this.name_new_pd = '';
      this.size_name_new = '';
      this.selectedOption = '';
      this.where_pick_pd = '';
      this.value_new = '';
      this.price_in = '';
      this.price_sell = '';
      this.formattedDate = '';

    }
  }
  send_data(event: Event) {
    if (this.productss.length > 0) {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure that you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.http.post('http://localhost/backend/add_new_pd.php', this.productss, { responseType: 'text' })
            .subscribe(response => {
              console.log(response);
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
              const timeout = 2000;
              setTimeout(() => {
                location.reload();
              }, timeout);
            });

        },
        reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        }
      });
    }
  }
  parseNumber(value: any): number {
    return parseFloat(value);
  }
  fetchType() {
    this.http.get<any[]>('http://localhost/backend/select_type.php')
      .subscribe(response => {
        this.typeoption = response;
      });
  }
  fetchProducts() {
    this.http.get<any[]>('http://localhost/backend/showdata_pickin.php')
      .subscribe(response => {
        this.products = response;
      });
  }
  fetchProductotal() {
    this.http.get<any[]>('http://localhost/backend/total_poduct.php')
      .subscribe(response => {
        this.value_pd = response;
      });
  }


  showDetails(prdId: string) {
    console.log('Selected Product ID:', prdId);
    // You can perform further actions based on the selected product ID
  }
  openAddNamePd() {
    this.showAddnamePDPopup = true;
  }
  openAddOrderPopup() {
    this.visible2 = true;
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
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'เพิ่มข้อมูลเสร็จสิ้น',

          }).then(() => {
            location.reload();
          });
        },
        (error) => {
          // Handle the error
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'เกิดข้อผิดพลาด',

          });
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
  fetchProductotal2() {
    this.http.get<any[]>('http://localhost/backend/select_option.php')
      .subscribe(response => {
        this.type_prd = response;
      });
  }

  fetchProductIds() {
    this.http.get<any[]>('http://localhost/backend/select2.php')
      .subscribe(response => {
        this.productIds = response;
      });
  }

}
