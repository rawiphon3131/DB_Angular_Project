import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css'],
  providers: [MessageService]
})
export class EditCompanyComponent implements OnInit {
  cpn_id!:string;
  cpnNa:any;
  cpn_edit_name!:string;
  cpn_edit_numtel!:string;
  cpn_edit_address!:string;
  cpnDetail!: any[];
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig,private http:HttpClient,private messageService: MessageService) {

      }
  ngOnInit(): void {
    
    this.cpn_id = this.config.data.cpn_id;
    this.cpnDetail = this.config.data.cpnDetail || [];

  }
  editCpnn() {
    const dataArray = [];
    for (const cpn of this.cpnDetail) {
      const { cpn_id } = cpn;
  
      const data = {
        cpn_id,
        cpn_edit_name: this.cpn_edit_name,
        cpn_edit_numtel: this.cpn_edit_numtel,
        cpn_edit_address: this.cpn_edit_address
      };
  
      dataArray.push(data);
    }
    const url = 'http://localhost/backend/edit_cpn.php';
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
