import {Directive, forwardRef} from "@angular/core";
import {NG_VALIDATORS, Validator, AbstractControl} from "@angular/forms";

const regEx=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

@Directive({
  selector: '[emailValidator]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef (() =>EmailValidator), multi: true}
  ]
})
export class EmailValidator implements  Validator{
  validate(c: AbstractControl): any{
    //console.log(c.value)
    const v=c.value;

    if(v && !v.match(regEx)){
      return { 'invalidEmail': true}
    }
    return null;
  }
}
