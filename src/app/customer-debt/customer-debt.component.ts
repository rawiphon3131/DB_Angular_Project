import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-debt',
  templateUrl: './customer-debt.component.html',
  styleUrls: ['./customer-debt.component.css']
})
export class CustomerDebtComponent implements OnInit{
  cusDbdt:any;
  cusDbdted:any;
  constructor(private http: HttpClient){

  }


  ngOnInit(): void {
    this.fetchCustomerDbdt();
  }
  showInfo(ods_id: number,cus_id:number){
    const data = {ods_id:ods_id,cus_id:cus_id};
    this.http.post<any>('http://localhost/backend/select_obs_by_id.php', data)
      .subscribe(response => {
        this.cusDbdted = response;
        const orderSum = response[0].ods_values;

        Swal.fire({
          title: 'ชำระเงินที่ติดค้าง',
          icon: 'info',
          html:`ยอดค้างชำระ <span style="color:red;">${orderSum}</span> บาท`,
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          confirmButtonText: 'ชำระเงิน',
          showCancelButton: true,
          inputValidator: (value: string): Promise<string | null> => {
            return new Promise((resolve) => {
              if (!value || Number(value) > orderSum) {
                resolve('กรอกจำนวนไม่ถูกต้อง หรือ เกินจำนวนกรุณาตรวจสอบอีกครั้ง');
              } else {
                resolve(null);
              }
            });
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const paymentAmount = result.value;
            if (Number(paymentAmount) != orderSum) {
              const data = { ods_id: ods_id,
                cus_id:cus_id, 
                payment_amount: paymentAmount,};
              let playment_total = orderSum-paymentAmount;
              this.http.post('http://localhost/backend/payment.php', data).subscribe(
                (response) => {
                  console.log(response);
                  // Handle the response from PHP
                },
                (error) => {
                  console.error(error);
                  // Handle any errors that occur during the HTTP request
                }
              );
              Swal.fire({
                title: 'ชำระเงินเสร็จสิ้น',
                html : `ชำระเงินจำนวน <span style="color:green;">${paymentAmount}</span> บาท เสร็จสมบูรณ์ ยอดค้างชำระคงเหลือ <span style="color:red;">${playment_total}</span> บาท.`,
                icon: 'success'
              }).then(()=>{
                location.reload();
              });
  
           
          }
          if (Number(paymentAmount) == orderSum) {
            const data = { ods_id: ods_id,
              cus_id:cus_id, 
              payment_amount: paymentAmount,};
            let playment_total = orderSum-paymentAmount;
            this.http.post('http://localhost/backend/payment2.php', data).subscribe(
              (response) => {
                console.log(response);
                // Handle the response from PHP
              },
              (error) => {
                console.error(error);
                // Handle any errors that occur during the HTTP request
              }
            );
            Swal.fire({
              title: 'ชำระเงินเสร็จสิ้น',
              html : `ชำระเงินจำนวน <span style="color:green;">${paymentAmount}</span> บาท เสร็จสมบูรณ์ ยอดค้างชำระคงเหลือ <span style="color:red;">${playment_total}</span> บาท.`,
              icon: 'success'
            }).then(()=>{
              location.reload();
            });

         
        }
        }
        });

      });
    console.log('Show info for ods_id:', ods_id);
    console.log('Show info for cus_id:', cus_id);



    
  }
  fetchCustomerDbdt() {
    this.http.get<any[]>('http://localhost/backend/select_obs.php')
      .subscribe(response => {
        this.cusDbdt = response;
      });
  }
}
