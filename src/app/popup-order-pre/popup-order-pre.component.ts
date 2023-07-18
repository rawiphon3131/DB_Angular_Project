import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { ProductPopupComponent } from '../product-popup/product-popup.component';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-popup-order-pre',
  templateUrl: './popup-order-pre.component.html',
  styleUrls: ['./popup-order-pre.component.css']
})
export class PopupOrderPreComponent {
  userId: string | null = null;
  orderList:any;
  orderNumberFilter!: string;
  constructor(private http: HttpClient,private dialogService: DialogService, public dynamicDialogRef: DynamicDialogRef, public dynamicDialogConfig: DynamicDialogConfig,private messageService: MessageService,private router:Router,public ref: DynamicDialogRef,) {
    this.userId = sessionStorage.getItem('user_id');
  }
  ngOnInit(): void {
    this.featOrderPre();
  }
  selectThis(order: any){
    const productWithInput = { ...order };
    this.ref.close(productWithInput);
    console.log(productWithInput);

  }
  featOrderPre(){
    this.http.get<any[]>('http://localhost/backend/select_orderpre_show.php')
      .subscribe(response => {
        this.orderList = response;
      });
  }
  filterOrders(): any[] {
    if (this.orderNumberFilter) {
      return this.orderList.filter((order: { ordp_bill_no: string; }) =>
        order.ordp_bill_no.toLowerCase().includes(this.orderNumberFilter.toLowerCase())
      );
    } else {
      return this.orderList;
    }
  }
}
