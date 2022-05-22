import { Component, OnInit } from '@angular/core';

import {AuthService} from '../../Security/_services/auth.service';
import {User} from '../../Security/model/user.model';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', './sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }


  ngOnInit() {
  }

  get user(): User {

    return this.authService.user;
  }

  set user(value: User) {
    this.authService.user = value;
  }



  onSubmit() {
    this.authService.register().subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
    );
  }
  /*  onSubmit() {
      this.authService.register(this.form).subscribe(
        data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
    }*/

}
