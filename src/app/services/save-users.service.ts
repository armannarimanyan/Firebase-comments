import { Injectable } from '@angular/core';
import { User,Comment } from '../model/user.model'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveUsersService {

  private dbPath = '/User';
  private dbComPath = '/Comment';
  public userRef: AngularFirestoreCollection<User>;
  public comRef: AngularFirestoreCollection<Comment>;
  constructor(public db: AngularFirestore) { 
    this.userRef = db.collection(this.dbPath);
    this.comRef = db.collection(this.dbComPath)
  }

  getAll(): AngularFirestoreCollection<User> {
    return this.userRef;
  }
  getDataById(id:any) {
    return this,this.userRef.doc(id)
  }
  createUser(dataUser: User): any {
    sessionStorage.setItem('user',dataUser.username || 'user')
    return this.userRef.add({ ...dataUser });
  }
  createComment(dataUser: Comment): any {
    return this.comRef.add({ ...dataUser });
  }
  update(id: any, data: any): Promise<void> {
    return this.userRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.userRef.doc(id).delete();
  }
}
