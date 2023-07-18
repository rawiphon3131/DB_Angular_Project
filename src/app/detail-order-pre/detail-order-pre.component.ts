import { Component, OnInit, Inject } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-detail-order-pre',
  templateUrl: './detail-order-pre.component.html',
  styleUrls: ['./detail-order-pre.component.css']
})
export class DetailOrderPreComponent implements OnInit {
  orderDetails!: any[];
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }
  ngOnInit() {
    this.orderDetails = this.config.data.orderDetails || [];

  }

}
