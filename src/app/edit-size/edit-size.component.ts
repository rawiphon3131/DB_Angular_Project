import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClient } from '@angular/common/http';

import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-edit-size',
  templateUrl: './edit-size.component.html',
  styleUrls: ['./edit-size.component.css'],
  providers:[MessageService],
})
export class EditSizeComponent implements OnInit {
  size_id: any;
  sizeDetail: any;
  size_edit!: string;
  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig, private http: HttpClient,private messageService: MessageService) {

  }
  ngOnInit(): void {
    this.size_id = this.config.data.size_id;
    this.sizeDetail = this.config.data.sizeDetail || [];
  }
  saveEdit() {
    const dataArray = [];
    for (const size of this.sizeDetail) {
      const { size_id } = size;

      const data = {
        size_id,
        size_edit: this.size_edit,
      };

      dataArray.push(data);
      const url = 'http://localhost/backend/con_edit_size.php';
      this.http.post(url,data).subscribe(
        (response) =>{
          console.log(response);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'แก้ไขเสร็จสิ้น' });
          const timeout = 2000;
          setTimeout(() => {
            location.reload();
          }, timeout);
        },(error) =>{
          this.messageService.add({ severity: 'error', summary: 'เกิดข้อผิดพลาด', detail: 'เกิดข้อผิดพลาด' });
        }
      )
    }
  }
}
