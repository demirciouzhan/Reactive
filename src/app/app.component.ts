import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames=['Chris','Anna'];

  ngOnInit(){
    this.signupForm=new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
        'email':new FormControl(null,[Validators.required, Validators.email],this.forbiddenEmails),
      }),
      'gender':new FormControl('male'),
      'hobbies':new FormArray([])
    });

    //###value changes text e yazdıkça girilen bilgiyi konsola yazdırır
    // this.signupForm.valueChanges.subscribe(
    //   (value)=>console.log(value)
    // );

    //####Status change  text e yazdıkça durumu konsola yazdırır(ng-invalid-ng-valid-ng-pending..)
    this.signupForm.statusChanges.subscribe(
      (status)=>console.log(status)
    );

    //###SETVALUE###
    // ####değerleri default olarak texte yazar 
    this.signupForm.setValue({
      'userData':{
        'username':'Max',
        'email': 'max@test.com'
      },
      'gender':'male',
      'hobbies':[]
    });

    //###PATCHVALUE###
    this.signupForm.patchValue({
      'userData':{
        'username':'Anna',
        'email': 'max@test.com'
      },
    });
  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby(){
    const control =new FormControl(null,Validators.required);
  (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control: FormControl):{[s: string]:boolean} {
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return{'nameIsForbidden':true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value==='test@test.com'){
          resolve({'emailIsForbidden':true});
        }else{
          resolve(null);
        }
      },1500);
    });
    return promise;
  }
}
