import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [AuthService]
})
export class LogoutComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    close() {
        this.authService.logout().subscribe(res => {
            res = res.json();
            console.log(res);
            this.router.navigateByUrl('/login');

            sessionStorage.removeItem('token');
            sessionStorage.removeItem('email');
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('superadmin');
        }, err => {
            err = err.json();
            console.log(err);
            this.router.navigateByUrl('/login');
        });
    }
}
