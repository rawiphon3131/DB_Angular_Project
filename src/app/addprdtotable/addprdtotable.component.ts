import { Component, OnInit, Inject } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-addprdtotable',
  templateUrl: './addprdtotable.component.html',
  styleUrls: ['./addprdtotable.component.css']
})
export class AddprdtotableComponent implements OnInit{
  orderDetails!: any[];
  value_pick_in:any[];
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.value_pick_in = [];
   }
  ngOnInit() {
    this.orderDetails = this.config.data.orderDetails || [];

  }
  addtotable(orderDetail:any){
    console.log(orderDetail);
    const inputValue = this.value_pick_in[orderDetail.ordpd_id];
    const productWithInput = { ...orderDetail,inputValue };
    this.ref.close(productWithInput);
    console.log(productWithInput);
  }
}
