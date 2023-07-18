import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-history-ofpickin',
  templateUrl: './history-ofpickin.component.html',
  styleUrls: ['./history-ofpickin.component.css']
})
export class HistoryOfpickinComponent implements OnInit{
  products:any;
  constructor(private http:HttpClient){

  }
ngOnInit(): void {
  this.fetchProducts();

}

  fetchProducts() {
    this.http.get<any[]>('http://localhost/backend/showdata_pickin.php')
      .subscribe(response => {
        this.products = response;
      });
  }
}
