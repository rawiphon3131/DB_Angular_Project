import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [MessageService]
})
export class EditProductComponent implements OnInit {
  prd_id!:string;
  prdDet!: any[];
  prd_name_id!:string;
  sizeLoad:any;
  type_prd:any;
  typed:any;
  selectedOptionSize!:string;
  selectedOption!:string;
  selectedTyped!:string;
  prd_sell_in!:string;
  prd_sell_out!:string;
  prd_name!:string;
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig,private http:HttpClient,private messageService: MessageService) {

  }
 
    saveEdit(){
      const dataArray = [];
      for (const prd of this.prdDet) {
        const { prd_id,prdp_id } = prd;
    
        const data = {
          prd_id,
          prdp_id,
          prd_name_id: this.prd_name_id,
          prd_name:this.prd_name,
          size: this.selectedOptionSize,
          type: this.selectedOption,
          type_prd: this.selectedTyped,
          prd_sell_in: this.prd_sell_in,
          prd_sell_out:this.prd_sell_out,
        };
    
        dataArray.push(data);
        const url = 'http://localhost/backend/con_edit.prd.php';
    this.http.post(url, dataArray).subscribe(
      (response: any) => {

      },(error) =>{
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'แก้ไขเสร็จสิ้น' });
        const timeout = 2000;
        setTimeout(() => {
          location.reload();
        }, timeout);
      });
        console.log(data);
      }
    }
  ngOnInit(): void {
    this.prd_id = this.config.data.prd_id;
    this.prdDet = this.config.data.prdDet || [];
    this.loadSize();
    this.fetchProductotal2();
    this.loadType();
  }
  loadSize(){
    this.http.get<any[]>('http://localhost/backend/select_size.php')
    .subscribe(response => {
      this.sizeLoad = response;
    });
  }
  fetchProductotal2() {
    this.http.get<any[]>('http://localhost/backend/select_option.php')
      .subscribe(response => {
        this.type_prd = response;
      });
  }
  loadType() {
    this.http.get<any[]>('http://localhost/backend/select_type.php')
      .subscribe(response => {
        this.typed = response;
      });
  }
}
