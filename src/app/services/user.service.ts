import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestoreService: AngularFirestore) {}

  public getUserById<User>(collectionName: string, userId: string): Observable<User[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query.where('uid', '==', userId);
      })
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            const { id } = a.payload.doc;
            return { id, ...data } as User;
          }),
        ),
      );
  }
}
