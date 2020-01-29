import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})


export class AccountComponent implements OnInit {
  connected = false;
  register = false;
  email = new FormControl('');
  password = new FormControl('');
  civility = new FormControl('');
  firstname = new FormControl('');
  lastname = new FormControl('');
  phone = new FormControl('');
  address = new FormControl('');
  zipcode = new FormControl('');
  city = new FormControl('');

  accountInfo = {
    email: '',
    civility: '',
    firstname: '',
    lastname: '',
    phone: '',
  };

  user = {
    user: this.email,
    password: this.password,
  };

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    if(localStorage.getItem('token') != null) {
      this.connected = true;
      this.accountService.getAccountinfo(localStorage.getItem('userid')).subscribe((data : any[])=>{
        this.accountInfo = {
          email: data['email'],
          civility: data['civility'],
          firstname: data['prenom'],
          lastname: data['nom'],
          phone: data['phone']
        };    });
    } else {
      this.connected = false;
    }

   }
  connect() {
    this.user = {
      user: this.email.value,
      password: this.password.value
    };
    this.accountService.getToken(this.user).subscribe((data : any[])=>{
      localStorage.setItem('token', data['token']);
      let arr = JSON.parse(atob(data['token'].split('.')[1]));
      localStorage.setItem('userid', arr['session']['userid']);
    });
    this.connected = true;

    this.accountService.getAccountinfo(localStorage.getItem('userid')).subscribe((data : any[])=>{
      this.accountInfo = {
        email: data['email'],
        civility: data['civility'],
        firstname: data['prenom'],
        lastname: data['nom'],
        phone: data['phone']
      };
    });
  }

  disconnect() {
    localStorage.clear();
    this.connected = false;
  }

  displayRegisterForm() {
    this.register = !this.register;
  }

}
