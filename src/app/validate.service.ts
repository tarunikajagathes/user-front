import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
  checkPassword(controlName:string,MatchingControlName:string){
    return (formGroup:FormGroup) => {
     let control=formGroup.controls[controlName];
     let matchingControl=formGroup.controls[MatchingControlName];
     if(control.invalid||matchingControl.invalid){
       return null;
     }
     if(control.value!==matchingControl.value){
       matchingControl.setErrors({confirmPassword:true})
     }
     else{
       matchingControl.setErrors(null);
     }
     return null;
    }
  }

  checkCardNumber(controlName:string){
    try{
    return (formGroup:FormGroup)=>{
      let num=formGroup.controls[controlName];
      if(num.invalid){
        return null;
      }
      let cardNumber=num.value;
      const lastDigit = Number(cardNumber[cardNumber.length - 1]);
      const reverseCardNumber = cardNumber
      .slice(0,cardNumber.length - 1)
      .split('')
      .reverse()
      .map((x: any) => Number(x));
      let sum = 0;
      for(let i = 0; i <= reverseCardNumber.length -1; i += 2){
        reverseCardNumber[i] = reverseCardNumber[i]*2;
        if(reverseCardNumber[i] > 9){
          reverseCardNumber[i] = reverseCardNumber[i] - 9;
        }
      }
      sum = reverseCardNumber
   .reduce((acc: any, currValue: any) => (acc + currValue), 0);

   if(((sum + lastDigit) % 10 === 0)){
     return null;
   }
   else{
     num.setErrors({card:true})
   }
return null;
    }
  }
catch(err){
  return null;
}
  }
}
