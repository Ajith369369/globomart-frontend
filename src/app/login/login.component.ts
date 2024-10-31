import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginImg: string = 'assets/login.jpg';

  constructor(private fb:FormBuilder, private api: ApiService, private router:Router){}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
  });

  login(){
    if (this.loginForm.invalid) {
      alert('Please fill the form properly.')
    } else {
      this.api.loginApi(this.loginForm.value).subscribe({
        next:(res:any) => {
          alert('Login successful!')
          console.log('Login res: ', res)
          sessionStorage.setItem("existingUser", JSON.stringify(res.existingUser))
          sessionStorage.setItem("token", res.token)
          this.router.navigateByUrl('/')
          
        }, error:(err:any) => {
          if (err.status == 406) {
            alert(err.error);
          } else {
            alert('Something went wrong.');
          }
        }
      })
    }
  }

}
