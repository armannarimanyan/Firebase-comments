import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SaveUsersService } from 'src/app/services/save-users.service';
import * as moment from 'moment';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public status: boolean = false;
  public comment = new FormControl('')
  public forumComments:any;
  public date: any;
  constructor(private saveUserService: SaveUsersService) { }

  ngOnInit(): void {
    this.saveUserService.userRef.valueChanges().subscribe(queriedItems => {
     this.forumComments = queriedItems.filter(a => a.comment);
    })
  }
  openEmojiModal() {
    this.status = !this.status
  }
  addEmoji(event:any) {
    this.comment = new FormControl(this.comment.value+ ' ' + event.emoji.native)
  }
  onChange() {
    this.status  = false
  }
  sendComment() {
    this.status = false
    let id = sessionStorage.getItem('id')
    this.date = moment().format("YYYY Do MMM HH:MM");
    this.saveUserService.update(id,{comment:this.comment.value,date:this.date})
    this.comment = new FormControl('')
  }
}
