import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstnameHelper = "";
  lastnameHelper = "";
  addressHelper = "";
  cityHelper = "";
  zipcodeHelper = "";
  emailHelper = "";
  phoneHelper = "";
  loginHelper = "";
  passwordLenghtHelper = "";  
  passwordUpperAndDigitHelper = "";

  profileForm = new FormGroup({

    firstname : new FormControl(''),
    lastname : new FormControl(''),
    address : new FormControl(''),
    city : new FormControl(''),
    zipcode : new FormControl(''),
    email : new FormControl(''),
    phone : new FormControl(''),
    login : new FormControl(''),
    password : new FormControl(''),
  });
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.firstnameHelper = "";
    this.lastnameHelper = "";
    this.addressHelper = "";
    this.cityHelper = "";
    this.zipcodeHelper = "";
    this.emailHelper = "";
    this.phoneHelper = "";
    this.loginHelper = "";
    this.passwordLenghtHelper = "";  
    this.passwordUpperAndDigitHelper = "";
    
  if (/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/.test(this.profileForm.value.email) == false) {
    this.emailHelper = "invalid e-mail address";
  }
  
  if (/^[0-9]{5,5}$/.test(this.profileForm.value.zipcode) == false) {
    this.zipcodeHelper = "invalid zipcode, zipcode must follow this pattern : 00000";
  }

  if (/^(\d\d\s){4}(\d\d)$/.test(this.profileForm.value.zipcode) == false) {
    this.phoneHelper = "invalid phone number, pattern : 00 00 00 00 00";
  }

    if (/^.{6,32}$/.test(this.profileForm.value.password) == false) {

    this.passwordLenghtHelper = "password must contains between 6-32 characters ! ";
  }

  if ( /(?=.*\d)(?=.*[A-Z])(?=.*\W)./.test(this.profileForm.value.password) == false) {
    this.passwordUpperAndDigitHelper = "password must contains at least 1 uppercase and 1 digit characters ! ";
  }
  }
}

