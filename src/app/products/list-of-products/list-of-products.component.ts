import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminSettings, Product, UserDetails } from 'src/app/datatype';
import { FetchProduct } from 'src/app/shared/services/fetchProduct.service';
import { SettingService } from 'src/app/shared/services/setting.service';
import { UserServicesService } from 'src/app/shared/services/user-services.service';

@Component({
  selector: 'app-list-of-products',
  templateUrl: './list-of-products.component.html',
  styleUrls: ['./list-of-products.component.css']
})
export class ListOfProductsComponent implements OnInit {
  enteredSearchValue: string = "";
  enableLoader: boolean = false;
  query: string = "";
  allProductsList: Product[] = [];
  settings: AdminSettings;
  admin:boolean;
  constructor(private fetch: FetchProduct, private http: HttpClient,private userService:UserServicesService,private route: Router, private settingService: SettingService) { }
  ngOnInit(): void {
    this.enableLoader = true;
    this.userService.userDetails.subscribe((res)=>{this.admin=res?.isAdmin});
    console.log(this.admin);
    this.fetch.fetchProduct().subscribe((products) => {
      this.allProductsList = products.sort(this.compare);
      this.settingService.currentSettings.subscribe((res) => {
        this.settings = res;
      });
    });
    this.enableLoader = false;
  }
   compare( a, b ) {
    if ( a.stock < b.stock ){
      return -1;
    }
    if ( a.stock > b.stock ){
      return 1;
    }
    return 0;
  }

  deleteProduct(id: string) {
    if (window.confirm("are you sure you want remove this product")) {
      this.fetch.deleteProduct(id).subscribe(() => {
        this.fetch.fetchProduct().subscribe((products) => {
          this.allProductsList = products;
        })
      });
    }
  }

  onProductSearch(query: string) {
    setTimeout(() => {
      return this.fetch.fetchProduct().subscribe((res) => {
        const products = res.filter((item) => item.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1 || item.heading?.toLowerCase().indexOf(this.query.toLowerCase()) > -1
          || item.subheading?.toLowerCase().indexOf(this.query.toLowerCase()) > -1 ||
          item.tags?.toLowerCase().indexOf(this.query.toLowerCase()) > -1);
        this.allProductsList = products;
      });
    }, 500);
  }

  onSelect() {
    if (window.confirm("are you sure you want to remove selected products")) {
      for (let p of this.allProductsList) {
        if (p.select) {
          this.fetch.deleteProduct(p.id).subscribe(() => {
            this.fetch.fetchProduct().subscribe((products) => {
              this.allProductsList = products;
            })
          });
        }
      }
    }
  }
  displayButton(){}
  deleteAll() {
    if (window.confirm("are you sure you want to delete All products")) {
      this.fetch.deleteAllProducts().subscribe((res) => {
        this.allProductsList = [];
      });
    }

  }
}
