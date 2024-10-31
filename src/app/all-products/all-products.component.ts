import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  // Define the carouselImg1 property with the path to the image
  carouselImg1: string = 'assets/carousel-1.jpg';
  carouselImg2: string = 'assets/carousel-2.jpg';
  carouselImg3: string = 'assets/carousel-3.jpg';
  cardImg: string = 'assets/card.jpg';
  loaderImg: string = 'assets/loader.gif';
  allProducts: any = [];

  // Dependency Injection
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.api.getAllProductsApi().subscribe({
      next: (res: any) => {
        console.log('res: ', res); // Gets response in line: 28 in Google Chrome Console
        this.allProducts = res;
      },
      error: (err: any) => {
        console.log('err: ', err); // Gets response in line: 32 in Google Chrome Console
      },
    });
  }

  addItemToWishlist(product:any){
    if (sessionStorage.getItem('token')) {
      this.api.addItemToWishlistApi(product).subscribe({
        next:(res:any) => {
          console.log('res: ', res)
          this.api.getWishlistCount()
          alert("Product added successfully!")
        }, error:(err:any) => {
          if (err.status==406) {
            alert(err.error)
          } else {
            alert("Something went wrong.")
          }
        }
      })
    } else{
      alert('Please login.')
    }

  }

  addToCart(product:any){
    if (sessionStorage.getItem('token')) {
      this.api.addToCartApi(product).subscribe({
        next:(res:any) => {
          console.log('res: ', res)
          alert("Product added successfully!")
          this.api.getCartCount()
        }, error:(err:any) => {
          if (err.status==406) {
            alert(err.error)
          } else {
            alert("Something went wrong.")
          }
        }
      })
    } else{
      alert('Please login.')
    }

  }

}
