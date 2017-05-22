import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SendEmailService} from '../../services/sendemail.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService, SendEmailService]
})
export class LoginComponent implements OnInit {

    private loginForm: FormGroup;
    private recoveryPasswordForm: FormGroup;


    private userNotFound: boolean;
    private user2NotFound: boolean;

    constructor(private authService: AuthService, private sendEmailService: SendEmailService, private router: Router, private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            'username': [null, Validators.required],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])]
        });

        this.recoveryPasswordForm = this.formBuilder.group({
            'user': [null, Validators.required]
        });
    }

    ngOnInit() {
    }

    loginSubmit(value: any) {
        this.authService.login(value.username, value.password).subscribe(res => {
            res = res.json();
            console.log(res);

            const item = res['Object'];

            sessionStorage.setItem('token', item.token);
            sessionStorage.setItem('username', item.username);
            sessionStorage.setItem('email', item.email);
            sessionStorage.setItem('superadmin', item.superadmin);

            if (res['Object'] != null) {
                this.router.navigateByUrl('/admin');
            }
        }, err => {
            err = err.json();
            console.log(err);
            this.userNotFound = true;
        });
    }

    recoveryPsw(value: any) {
        this.sendEmailService.sendEmail(value.user).subscribe(res => {
        res = res.json();
        console.log(res);

        if (res['Object'] == null) {
          this.router.navigateByUrl('/recovery');
        }
      }, err => {
        err = err.json();
        console.log(err);
        this.user2NotFound = true;
      });
      //this.router.navigateByUrl('/recovery');
    }

}
