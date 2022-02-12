import { Injectable } from '@angular/core';
import { User } from '../model/user.model'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveUsersService {

  private dbPath = '/User';
  private dbComPath = '/Comment';
  public userRef: AngularFirestoreCollection<User>;
  constructor(public db: AngularFirestore) { 
    this.userRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<User> {
    return this.userRef;
  }
  createUser(dataUser: User): any {
    sessionStorage.setItem('user',dataUser.username || 'user')
    return this.userRef.add({ ...dataUser });
  }
  update(id: any, data: any): Promise<void> {
    return this.userRef.doc(id).update(data);
  }
  delete(id: string): Promise<void> {
    return this.userRef.doc(id).delete();
  }
}
