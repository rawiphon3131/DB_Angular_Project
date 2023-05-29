import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-order-popup',
  templateUrl: './add-order-popup.component.html',
  styleUrls: ['./add-order-popup.component.css']
})
export class AddOrderPopupComponent implements OnInit{
  name_pd: any[];
  where_pick: any[];
  product_values: any[];
  date_pick: any[];
  optioneiei:any[];

  constructor(private http: HttpClient) { 
    this.name_pd=[];
    this.where_pick=[];
    this.date_pick=[];
    this.product_values=[];
    this.optioneiei=[];
  }

  ngOnInit() {
    // Make an HTTP GET request to the PHP backend
    this.http.get<any[]>('http://localhost/backend/select2.php')
      .subscribe(response => {
        
      });
  }

  add_products(){
    if (this.name_pd) {
      const data = { name_pd:this.name_pd,where_pick:this.where_pick,product_values:this.product_values,date_pick:this.date_pick,optioneiei:this.optioneiei };
      this.http.post('http://localhost/backend/insert.php', JSON.stringify(data))
      .subscribe(response => {
        // Handle the response from the PHP backend
        console.log(response);
      });
  }
}
}
