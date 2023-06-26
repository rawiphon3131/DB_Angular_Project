
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-add-cus-new',
  templateUrl: './popup-add-cus-new.component.html',
  styleUrls: ['./popup-add-cus-new.component.css']
})
export class PopupAddCusNewComponent implements OnInit{
  name_cus_new:string ='';
  address_cus_new:string ='';
  phone_cus_new:string ='';
  constructor(private http: HttpClient,private router: Router) {

}
ngOnInit(): void {
  
}
send_data_succ(){
  const data = { name_cus_new: this.name_cus_new, address_cus_new: this.address_cus_new,phone_cus_new:this.phone_cus_new };
  this.http.post('http://localhost/backend/add_new_cus.php', data).subscribe(
    (response: any) => {
      console.log(response); 
      alert('เพิ่มข้อมูลเสร็จสิ้น');
      location.reload();
    },
    (error) => {
      // Handle any errors that occur during the HTTP request
      console.error(error);
      alert('เกิดข้อผิดพลาดโปรดตรวจสอบข้อมูลให้ถูกต้อง');
    }
  );
}
}
