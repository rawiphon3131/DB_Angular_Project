import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-cusinfo',
  templateUrl: './edit-cusinfo.component.html',
  styleUrls: ['./edit-cusinfo.component.css'],
  providers: [MessageService]
})
export class EditCusinfoComponent implements OnInit {
  cusDetail!: any[];
  cus_id!:string;
  cus_name!:string;
  cus_numtel!:string;
  cus_address!:string;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig,private http:HttpClient,private messageService: MessageService) {

  }
ngOnInit(): void {
  this.cus_id = this.config.data.cus_id;
    this.cusDetail = this.config.data.cusDetail || [];
}
editCus(cus_name_id:number){
  console.log(cus_name_id);
  const dataArray = [];
  for (const cus of this.cusDetail) {
    const { cus_id } = cus;

    const data = {
      cus_id,
      cus_name_id,
      cus_name: this.cus_name,
      cus_numtel: this.cus_numtel,
      cus_address: this.cus_address
    };

    dataArray.push(data);
  }
  const url = 'http://localhost/backend/edit_cusinfo.php';
  this.http.post(url, dataArray).subscribe(
    (response: any) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'แก้ไขเสร็จสิ้น' });

    },(error) =>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'แก้ไขเสร็จสิ้น' });
      const timeout = 2000;
      setTimeout(() => {
        location.reload();
      }, timeout);
    }
  );
}
}
