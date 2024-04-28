import { Injectable, inject } from '@angular/core';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { UserInterface } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore = inject(Firestore);

  RegisterLogin(email: string) {
    let col = collection(this.firestore, 'logins');
    addDoc(col, { fecha: new Date(), "user": email});
  }

  GetLogins(){
    let col = collection(this.firestore, 'logins');
    
    const observable = collectionData(col);

    return observable;
  }
}
