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
  public newComments = []
  public id:string;
  constructor(private saveUserService: SaveUsersService) { }

  ngOnInit(): void {
    this.saveUserService.comRef.valueChanges().subscribe(queriedItems => {
     this.forumComments = queriedItems.filter(a => a.comment)
     this.forumComments = this.forumComments.sort(function (left, right) {
      return moment.utc(left.date).diff(moment.utc(right.date))
  });
    })
    this.id = sessionStorage.getItem('id')
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
    let username = sessionStorage.getItem('user')
    let comment = this.comment.value
    this.status = false
    this.date = moment().format('LL LTS');
    let date = this.date
     this.saveUserService.createComment({username,comment,date})
    this.comment = new FormControl('')
  }
}
