import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AuthService]
})
export class AdminComponent implements OnInit {

    private currentChoice: string;
    private isSuperAdmin = false;

    constructor(private authService: AuthService, private router: Router) {
        this.authService.checkToken().subscribe(res => {
            res = res.json();
            console.log(res);

            const item = res['Object'];
            if (item == null) {
                this.router.navigateByUrl('/login');
            } else {
                sessionStorage.setItem('superadmin', item.superadmin);
                this.isSuperAdmin = item.superadmin;

                if (this.currentChoice == undefined) {
                    this.router.navigate(['/admin', { outlets: { 'admin': ['manage-profile'] } } ]);
                }
            }
        }, err => {
            err = err.json();
            console.log(err);
            this.router.navigateByUrl('/login');
        });
    }

    ngOnInit() {
    }

    setActive(choice: string) {
        this.currentChoice = choice;
    }

    isActive(choice: string) {
        if (this.currentChoice === choice) {
            return 'active';
        } else {
            return 'not';
        }
    }
}