import {Directive, forwardRef} from "@angular/core";
import {NG_VALIDATORS, Validator, AbstractControl} from "@angular/forms";

const regEx=/.{8}/;

@Directive({
  selector: '[passwordValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef (() =>PasswordValidator), multi: true}
  ]
})

export class PasswordValidator implements  Validator{
  validate(c: AbstractControl): any{
    //console.log(c.value)
    const v=c.value;

    if(v && !v.match(regEx)){
      return { 'invalidPassword': true}
    }
    return null;
  }
}
