import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-newstock-pd',
  templateUrl: './add-newstock-pd.component.html',
  styleUrls: ['./add-newstock-pd.component.css']
})
export class AddNewstockPdComponent implements OnInit {
  id_product!:string;

  sizeLoad:any;
  type_prd:any;
  selectedOptionSize!:string;
  constructor(private http:HttpClient){

  }
  ngOnInit(): void {
    this.loadSize();
    this.fetchProductotal2();

  }

  loadSize(){
    this.http.get<any[]>('http://localhost/backend/total_poduct.php')
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
}
