import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/datatype';
import { FetchProduct } from 'src/app/shared/services/fetchProduct.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productDetails: Product;
  pid: string;
  constructor(private route: ActivatedRoute, private product: FetchProduct, private router: Router) { }

  ngOnInit(): void {
    this.pid = this.route.snapshot.paramMap.get('id');
    this.product.getProduct(this.pid).subscribe((data) => {
      this.productDetails = data;
    });

  }
  deleteProduct(id: string) {
    if (window.confirm("are you sure want to remove this product")) {
      this.product.deleteProduct(this.pid).subscribe(() => {
        console.log("product delelted");
        this.router.navigate(['/list-of-products']);
      });
    }

  }
  onEdit() {
    this.router.navigate([`/create-product/${this.pid}`]);
  }

}
