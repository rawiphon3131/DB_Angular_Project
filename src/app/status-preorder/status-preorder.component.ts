import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig, DialogService } from 'primeng/dynamicdialog';
import { DetailOrderPreComponent } from '../detail-order-pre/detail-order-pre.component';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';




@Component({
  selector: 'app-status-preorder',
  templateUrl: './status-preorder.component.html',
  styleUrls: ['./status-preorder.component.css'],
  providers: [DynamicDialogRef, DynamicDialogConfig, DialogService,MessageService],
})

export class StatusPreorderComponent implements OnInit{
  userId: string | null = null;
  orderList:any;
  orderNumberFilter!: string;
  constructor(private http: HttpClient,private dialogService: DialogService, public dynamicDialogRef: DynamicDialogRef, public dynamicDialogConfig: DynamicDialogConfig,private messageService: MessageService,private router:Router) {
    this.userId = sessionStorage.getItem('user_id');
  }
  ngOnInit(): void {
    this.featOrderPre();
  }
  detailThis(ordp_id:number){
    console.log(ordp_id);
    const data = { ordp_id: ordp_id};
    this.http.post('http://localhost/backend/detail_orderp.php', data).subscribe(
      (response) => {
        const orderDetails = Array.isArray(response) ? response : [response];
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

        const dialogRef: DynamicDialogRef = this.dialogService.open(DetailOrderPreComponent, dialogConfig);
        console.log(response);});
  }
  featOrderPre(){
    this.http.get<any[]>('http://localhost/backend/select_orderpre_show2.php')
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
