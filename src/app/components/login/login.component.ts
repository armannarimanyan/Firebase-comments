import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { SaveUsersService } from 'src/app/services/save-users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userProfile = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor() { }

  ngOnInit(): void {

  }
  
  signIn() {

  }
}
