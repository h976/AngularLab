import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../catalogue.service';
import {ActivatedRoute, NavigationEnd, Route, Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: any ;

  constructor(public catalogueService: CatalogueService ,
              public route: ActivatedRoute,
              public router:Router) { }

  ngOnInit() {
    this.router.events.subscribe(value =>{
      if(value instanceof NavigationEnd){
        let url = value.url;
        console.log(url);

        let p1=this.route.snapshot.params.p1;
        if(p1==1){
          this.getProducts('/products/search/selectedProducts');
        }else if(p1==2){
          let idCat = this.route.snapshot.params.p2;
          this.getProducts('/categories/'+idCat+'/products');
        }
      }
    });
    let p1=this.route.snapshot.params.p1;
    if(p1==1){
      this.getProducts('/products/search/selectedProducts');
    }
    
  }

  public getProducts(url: string){
    this.catalogueService.getResource(url)
      .subscribe(data=>{
        this.products = data;
      },error => {
        console.log(error);
      })
      
  }

}
