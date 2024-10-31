import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css'],
})
export class ViewProductComponent implements OnInit {
  cardImg: string = 'assets/card.jpg';
  product: any = [];

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      // console.log(res);
      const { id } = res;
      this.getAProduct(id);
    });
  }

  getAProduct(id: any) {
    this.api.getAProductApi(id).subscribe({
      next: (res: any) => {
        console.log('res: ', res); // Gets response in line: 17 in Google Chrome Console
        this.product = res;
      },
      error: (err: any) => {
        console.log('err: ', err); // Gets response in line: 21 in Google Chrome Console
      },
    });
  }

  addItemToWishlist() {
    if (sessionStorage.getItem('token')) {
      this.api.addItemToWishlistApi(this.product).subscribe({
        next: (res: any) => {
          console.log('res: ', res);
          this.api.getWishlistCount();
          alert('Product added successfully!');
        },
        error: (err: any) => {
          if (err.status == 406) {
            alert(err.error);
          } else {
            alert('Something went wrong.');
          }
        },
      });
    } else {
      alert('Please login.');
    }
  }

  addToCart() {
    if (sessionStorage.getItem('token')) {
      this.api.addToCartApi(this.product).subscribe({
        next: (res: any) => {
          console.log('res: ', res);
          alert('Product added successfully!');
          this.api.getCartCount()
        },
        error: (err: any) => {
          if (err.status == 406) {
            alert(err.error);
          } else {
            alert('Something went wrong.');
          }
        },
      });
    } else {
      alert('Please login.');
    }
  }
}
