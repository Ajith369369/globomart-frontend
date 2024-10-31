import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  token: any = '';
  username: any = '';
  user: any = '';
  wishlistCount: number = 0;
  cartCount: number = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.token = sessionStorage.getItem('token');
      this.username = sessionStorage.getItem('existingUser');
      this.user = JSON.parse(this.username).username;
      this.api.wishlistCount.subscribe((res: any) => {
        this.wishlistCount = res;
        console.log('this.wishlistCount: ', this.wishlistCount)
      });
      this.api.cartCount.subscribe((res: any) => {
        this.cartCount = res;
        console.log('this.cartCount: ', this.cartCount)
      });
    }
  }
}
