import { Component, OnInit, ViewChild } from '@angular/core';
import {Admin} from '../../models/admin/admin';
import {ManageAdminsService} from '../../services/manageAdmins.service';
import {ListViewComponent} from '../list-view/listview.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-manage-administrators',
    templateUrl: './manage-administrators.component.html',
    styleUrls: ['./manage-administrators.component.css'],
    providers: [ManageAdminsService]
})
export class ManageAdministratorsComponent implements OnInit {

    @ViewChild('list') list: ListViewComponent;

    private adminArray: Array<Admin>    = new Array<Admin>();
    private selectedItem: Admin         = null;

    private addAdminModalVisibility     = false;
    private updateAdminModalVisibility  = false;

    private addAdminForm: FormGroup;
    private updateAdminForm: FormGroup;

    constructor(private authService: AuthService, private manageAdminsService: ManageAdminsService, private router: Router, private formBuilder: FormBuilder) {
        this.authService.checkToken().subscribe(res => {
            res = res.json();
            console.log(res);
            const item = res['Object'];
            if (item == null || !item.superadmin) {
                this.router.navigateByUrl('/admin');
            }
        }, err => {
            err = err.json();
            console.log(err);
            this.router.navigateByUrl('/admin');
        });

        // Template validazione form
        const emailRegex: any =/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        this.addAdminForm = this.formBuilder.group({
            'email': [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            'username': [null, Validators.required],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])],
            'superAdmin': false
        });

        this.updateAdminForm = this.formBuilder.group({
            'email': [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            'username': [null, Validators.required],
            'password': null,
            'superAdmin': false
        });
    }

    ngOnInit() {
        this.list.setTitle('Lista amministratori');
        this.list.setFirstColumnText('Username');
        this.list.setHashColumnVisibility(false);

        this.refreshAdmins();
    }

    onSelectItem(data) {
        console.log(data.item);

        const self = this;
        switch (data.event) {
            case 'select':
                break;
            case 'update':
                this.updateAdminForm.setValue({
                    'email': data.item.email,
                    'username': data.item.username,
                    'password': null,
                    'superAdmin': data.item.superadmin ? data.item.superadmin : false
                });
                this.updateAdminModalVisibility = true;
                break;
            case 'delete':
                this.manageAdminsService.deleteAdmin(data.item.email, data.item.username).subscribe(res => {
                    res = res.json();
                    console.log(res);
                    self.refreshAdmins();
                }, err => {
                    err = err.json();
                    console.log(err);
                });
                break;
        }
        this.selectedItem = data.item;
    }

    closeModal() {
        this.addAdminModalVisibility    = false;
        this.updateAdminModalVisibility = false;
        this.addAdminForm.reset();
        this.updateAdminForm.reset();
    }

    addAdminSubmit(value: any) {
        this.manageAdminsService.addAdmin(value.email, value.username, value.password, value.superAdmin).subscribe(res => {
            res = res.json();
            console.log(res);

            this.refreshAdmins();
            this.closeModal();
        });
    }

    updateAdminSubmit(value: any) {
        this.manageAdminsService.updateAdmin(value.email, value.username, value.password).subscribe(res => {
            res = res.json();
            console.log(res);

            this.refreshAdmins();
            this.closeModal();
        });
    }

    refreshAdmins() {
        this.adminArray = new Array<Admin>();

        // Workaround temporaneo
        this.adminArray.push(new Admin('', '', ''));

        this.manageAdminsService.getAdmins().subscribe(res => {
            res = res.json();
            console.log(res);

            for (const item of res['Object']) {
                this.adminArray.push(new Admin(item.email, item.username, null, item.superadmin));
            }
            this.adminArray.shift();
        });
    }
}
