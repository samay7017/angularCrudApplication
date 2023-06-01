import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/datatype';
import { FetchProduct } from 'src/app/shared/services/fetchProduct.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  updateEnable: boolean = false;
  isLoading: boolean = true;
  createProductform: FormGroup;
  productId: string;
  productData: Product;
  productMessage: undefined | string;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private product: FetchProduct) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.updateEnable = this.productId ? true : false;
    this.initializeForm();
    if (this.updateEnable) {
      this.product.getProduct(this.productId).subscribe((data) => {
        this.productData = data
        this.createProductform.patchValue({
          name: this.productData.name,
          expiry: this.productData.expiry,
          stock: this.productData.stock,
          heading: this.productData.heading,
          subheading: this.productData.subheading,
          tags: this.productData.tags,
          description: this.productData.description
        });
        this.isLoading = !this.isLoading;
      });
    }
    else {
      this.isLoading = false;
    }
  }


  initializeForm(): void {

    this.createProductform = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      expiry: new FormControl(null, [Validators.required, this.dateValidator]),
      stock: new FormControl(null, [Validators.required, Validators.min(0) ,this.negativeValidator]),
      heading: new FormControl(null, Validators.maxLength(150)),
      subheading: new FormControl(null, Validators.maxLength(160)),
      tags: new FormControl(null, [this.tagsValidator]),
      description: new FormControl(null, Validators.maxLength(250))
    })
  }

  onSubmit() {
    if (this.updateEnable) {

      this.product.updateProduct(this.createProductform.value, this.productId).subscribe((res) => {
        if (res) {
          this.productMessage = "Product has been updated";
        }
      });
      setTimeout(() => {
        this.productMessage = undefined;
        this.router.navigate(['/list-of-products']);
      }, 3000);
    }
    else {
      this.product.createProduct(this.createProductform.value).subscribe((res) => { console.log(res) });
      setTimeout(() => {
        this.router.navigate(['/list-of-products']);   // need to add the loader here 
      }, 2000);

    }
  }

  dateValidator(control: FormControl) {
    if (control.value == null) return { dateValidator: true };
    const date: string = control.value;
    if (!/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(date)) return { dateValidator: true };
    var parts = date?.split("-");
    var day = parseInt(parts[2], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[0], 10);
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
      return { dateValidator: true };

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
      monthLength[1] = 29;

    if (day < 0 && day > monthLength[month - 1]) return { dateValidator: true }
    return null;


  }
  tagsValidator(control:FormControl){
    const tags:string = control.value;
    var parts = tags?.split(" ");
    if(parts?.length>10) return {tagsValidator:true};
    return null;
  }

  negativeValidator(control:FormControl){
    const val:number=control.value;
    if(val<0) return {negativeValidator:true};
    return null;
  }
}
