import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SaveUsersService } from 'src/app/services/save-users.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})

export class RegisterUserComponent implements OnInit {
  public userProfile = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    comfirmPassword: new FormControl(''),
  })

  constructor(private userService: SaveUsersService,private router: Router) { 
 
   }

  ngOnInit(): void {
  }
  async onSubmit() {
    let {username,password,comfirmPassword} = this.userProfile.value
    let comment = ''
    let date = ''
    if(password === comfirmPassword) {
      const newUser = await this.userService.createUser({username,password,comment,date})
      sessionStorage.setItem('id',newUser.id)
      this.router.navigate(['/chat'])
    }
  }
}
