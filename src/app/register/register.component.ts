import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerImg: string = 'assets/register.jpg';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]],
  });

  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm);
      this.api.registerApi(this.registerForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          alert('Registration successful!');
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.log(err);
          if (err.status == 406) {
            alert(err.error);
          } else {
            alert('Something went wrong.');
          }
        },
      });
    } else {
      alert('Please fill the fields properly.');
    }
  }
}
