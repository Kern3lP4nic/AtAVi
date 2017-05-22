import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-manage-profile',
  templateUrl: './manage-profile.component.html',
  styleUrls: ['./manage-profile.component.css'],
  providers: [AuthService]
})
export class ManageProfileComponent implements OnInit {

    private email: string;
    private username: string;
    private superadmin: boolean;

    private matchPasswords: boolean;

    private profileForm: FormGroup;
    private passwordForm: FormGroup;

    constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
        this.email      = sessionStorage.getItem('email');
        this.username   = sessionStorage.getItem('username');
        //this.superadmin = sessionStorage.getItem('superadmin');

        this.authService.checkToken().subscribe(res => {
            res = res.json();
            console.log(res);
            const item = res['Object'];
            this.email = item.email;
            this.username = item.username;
            this.superadmin = item.superadmin;
        }, err => {
            err = err.json();
            console.log(err);
            router.navigateByUrl('/login');
        });

        // Template validazione form
        const emailRegex: any =/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        this.profileForm = this.formBuilder.group({
            'email': [this.email, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            'username': [this.username, Validators.required]
        });
        this.passwordForm = this.formBuilder.group({
            'email': [this.email, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            'username': [this.username, Validators.required],
            'oldPassword': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
            'newPassword': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
            'newPasswordConfirm': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])]
        });
    }

    ngOnInit() {
    }

    profileSubmit(value: any) {
        this.authService.update(value.username, value.email).subscribe(res => {
            res = res.json();
            console.log(res);
            sessionStorage.setItem('email', value.email);
            sessionStorage.setItem('username', value.username);
        }, err => {
            err = err.json();
            console.log(err);
        });
    }

    passwordSubmit(value: any) {
        const self = this;
        if (value.newPassword !== value.newPasswordConfirm) {
            this.matchPasswords = true;
        } else {
            this.matchPasswords = false;
            this.authService.update(value.username, value.email, value.oldPassword, value.newPassword).subscribe(res => {
                res = res.json();
                console.log(res);
                self.passwordForm.reset();
            }, err => {
                err = err.json();
                console.log(err);
            });
        }
    }
}
