import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SendEmailService} from '../../services/sendemail.service';

@Component({
  selector: 'app-recovery-psw',
  templateUrl: './recovery-psw.component.html',
  styleUrls: ['./recovery-psw.component.css'],
  providers: [SendEmailService]
})
export class RecoveryPswComponent implements OnInit {

  private checkRecoveryForm: FormGroup;

  constructor(private sendEmailService: SendEmailService, private router: Router, private formBuilder: FormBuilder) {
    this.checkRecoveryForm = this.formBuilder.group({
      'token': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(16)])]
    });
  }

  ngOnInit() {
  }

  checkRecoverySubmit(value: any){
    this.sendEmailService.update(value.token, value.password).subscribe(res => {
      res = res.json();
      console.log(res);

      if (res['Object'] == null) {
        this.router.navigateByUrl('/login');
      }
    }, err => {
      err = err.json();
      console.log(err);
    });
  }
}
