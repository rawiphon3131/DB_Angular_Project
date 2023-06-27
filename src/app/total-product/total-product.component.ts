import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-total-product',
  templateUrl: './total-product.component.html',
  styleUrls: ['./total-product.component.css']
})
export class TotalProductComponent implements OnInit{
  value_pd:any[];
  constructor(private http: HttpClient) { 
    this.value_pd =[];
  }

  ngOnInit() {
    this.fetchProductotal();
  }
//PART OF SELECT DATA FROM PHP
  fetchProductotal(){
    this.http.get<any[]>('http://localhost/backend/total_poduct.php')
    .subscribe(response => {
      this.value_pd = response;
    });
  }
}
