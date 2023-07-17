import { Component, OnInit, Inject } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {
  header!: string;
  orderDetails!: any[];
  totalSum!: number;



  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit() {
    this.header = this.config.header || 'รายระเอียดรายการสั่งซื้อ';
    this.orderDetails = this.config.data.orderDetails || [];
    this.totalSum = this.calculateTotalSum();
  }

  calculateTotalSum(): number {
    let totalSum = 0;
    for (let orderDetail of this.orderDetails) {
      totalSum += orderDetail.order_values * orderDetail.prd_sell;
    }
    return totalSum;
  }
}
