import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  serverUrl = 'http://localhost:4000';
  wishlistCount = new BehaviorSubject(0);
  cartCount = new BehaviorSubject(0);

  /**
   * Prevent data loss while reloading/refeshing of the component.
   */
  constructor(private http: HttpClient) {
    this.getWishlistCount();
    this.getCartCount();
  }

  /**
   * api to get all products
   */
  getAllProductsApi() {
    return this.http.get(`${this.serverUrl}/all-product`);
  }

  // api to get a particular product
  getAProductApi(id: any) {
    return this.http.get(`${this.serverUrl}/view-product/${id}`);
  }

  // api to register a user
  registerApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/register`, reqBody);
  }

  // api to login a user
  loginApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/login`, reqBody);
  }

  /** addTokenToHeader()
   * The function addTokenToHeader() is responsible for adding an authorization token (retrieved from sessionStorage) to the request headers, which is typically required for making authenticated HTTP requests.
   * Creating Headers Object: It initializes a new HttpHeaders object (headers) that will contain the HTTP headers for your request.
   * Retrieving Token from Session Storage: The token is retrieved from sessionStorage using sessionStorage.getItem('token').
   * Appending Token to Headers: If the token exists, it appends the token to the Authorization header in the format Bearer {token}. This is the typical format for sending tokens in the HTTP Authorization header.
   * Returning Headers: It returns an object containing the headers which can be used in an HTTP request.
   * We can use this addTokenToHeader function to send the Authorization header when making an HTTP request with Angular’s HttpClient.
   */
  addTokenToHeader() {
    // HttpHeaders() - add headers to http request
    let headers = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    console.log('token: ', token);
    console.log('headers: ', headers);
    return { headers };
  }

  // api to add item to wishlist
  addItemToWishlistApi(reqBody: any) {
    return this.http.post(
      `${this.serverUrl}/add-wishitem`,
      reqBody,
      this.addTokenToHeader()
    );
  }

  // api to get all items from wishlist
  getItemWishListApi() {
    return this.http.get(
      `${this.serverUrl}/all-wishlistItems`,
      this.addTokenToHeader()
    );
  }

  // get number of items in wishlist
  getWishlistCount() {
    this.getItemWishListApi().subscribe((res: any) => {
      this.wishlistCount.next(res.length);
    });
  }

  // api to remove an item from wishlist
  removeWishlistItemApi(id: any) {
    return this.http.delete(`${this.serverUrl}/delete-wishlistItem/${id}`);
  }

  // add to cart api
  addToCartApi(reqBody: any) {
    return this.http.post(
      `${this.serverUrl}/add-cart`,
      reqBody,
      this.addTokenToHeader()
    );
  }

  // #region Multi-line Comment
  /**
   * get all cart items
   */
  // #endregion
  getCartItemApi() {
    return this.http.get(
      `${this.serverUrl}/all-cartItem`,
      this.addTokenToHeader()
    );
  }

  // #region Multi-line Comment
  /**
   * get number of items in cart.
   * The getCartCount method is defined, which calls the getCartItemApi method to retrieve all the items in the cart.
   * Inside the getCartCount method, a subscription is made to the observable returned by getCartItemApi.
   * When the response from the API is received, the length property of the response array is used to update the cartCount BehaviorSubject.
   * The cartCount BehaviorSubject is a type of Observable that allows components to subscribe to changes in the cart count.
   * This code ensures that the cartCount is always up-to-date with the number of items in the cart, allowing other components to react to changes in the cart count.
   */
  // #endregion
  getCartCount() {
    this.getCartItemApi().subscribe((res: any) => {
      this.cartCount.next(res.length);
    });
  }

  // #region Multi-line Comment
  /**
   * API to remove an item from cart
   */
  // #endregion
  removeCartItemApi(id: any) {
    return this.http.delete(`${this.serverUrl}/delete-cartItem/${id}`);
  }

  /**
   * api to empty cart
   */
  emptyCartApi() {
    return this.http.delete(
      `${this.serverUrl}/empty-cart`,
      this.addTokenToHeader()
    );
  }

  /**
   * api to increment a cart item
   */
  incrementApi(id: any) {
    return this.http.get(`${this.serverUrl}/increment-cartitem/${id}`);
  }

  /**
   * api to decrement a cart item
   */
  decrementApi(id: any) {
    return this.http.get(`${this.serverUrl}/decrement-cartitem/${id}`);
  }
}
