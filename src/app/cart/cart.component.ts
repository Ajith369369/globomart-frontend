import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cardImg: string = 'assets/card.jpg';
  emptyCartImg: string = 'assets/empty-cart.jpg';
  allProducts: any = [];
  total: number = 0;

  constructor(private api: ApiService, private router:Router) {}

  ngOnInit(): void {
    this.getCartItem();
  }

  getCartItem() {
    this.api.getCartItemApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.allProducts = res;
        this.getTotal();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteCartItem(id: any) {
    this.api.removeCartItemApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getCartItem();
        // this.api.getCartCount()
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  emptyCart() {
    this.api.emptyCartApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.getCartItem();
        this.api.getCartCount();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  increment(id: any) {
    this.api.incrementApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getCartItem();
        this.api.getCartCount();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  decrement(id: any) {
    this.api.decrementApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getCartItem();
        this.api.getCartCount();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  // #region Multi-line Comment
  /**
   * var_1 = allProduct.reduce((n1, n2)=> n1+n2)
   * 
   * Math.ceil is a static method of the Math object in JavaScript that rounds a number up to the nearest integer. It takes a number as an argument and returns the smallest integer greater than or equal to the given number.
   * If cost = 12.34, roundedCost = Math.ceil(cost) => Output: 13
   */
  // #endregion
  getTotal() {
    this.total = Math.ceil(
      this.allProducts
        .map((item: any) => item.grandTotal)
        .reduce((n1: any, n2: any) => n1 + n2)
    );
    console.log('this.total: ', this.total);
  }

  checkout() {
    sessionStorage.setItem("total", JSON.stringify(this.total))
    this.router.navigateByUrl('/checkout')
  };
}
