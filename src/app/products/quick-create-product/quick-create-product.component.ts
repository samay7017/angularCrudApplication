import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quick-create-product',
  templateUrl: './quick-create-product.component.html',
  styleUrls: ['./quick-create-product.component.css']
})
export class QuickCreateProductComponent implements OnInit {

  constructor(private http :HttpClient , private router:Router) { }

  ngOnInit(): void {
  }
  onProductCreate(form: NgForm){
    console.log(form);
    this.http.post<{ name: string }>('https://angular-project-ce029-default-rtdb.firebaseio.com/products.json',form.value).subscribe((res) => {  this.router.navigate(['/list-of-products']); });  
  }

}
