import { Directive, Input } from '@angular/core';
import { AbstractControl, ValidatorFn, Validator, FormControl, NG_VALIDATORS } from '@angular/forms';


@Directive({
  selector: '[minMaxValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: MinMaxValidatorDirective, multi: true }
  ]
})
export class MinMaxValidatorDirective implements Validator {

  @Input('min-') min: number;
  @Input('max-') max: number;
  @Input('type') type: string;

  private validator: ValidatorFn;
  
  constructor() {
    this.validator = this.validateFactory();
  }
  
  validate(c: FormControl) {
    return this.validator(c);
  }

  validateFactory() : ValidatorFn {
    return (input: AbstractControl) => {
      
      let num = input.value;

      num = this.type == 'pokemonNo'
        ? (
            ((num >= this.min) && (num <= 807)) || 
            ((num >= 10001) && (num <= this.max))
          )
        : (num > this.min - 1) && (num < this.max + 1);

      const isValid = num;

      if(isValid || input.value === '') {
          return null;
      } else {
        return {
          range: {
            valid: false
          }
        };
      }
    }
  }

}
