import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import firebase from 'firebase';
import { map, take } from 'rxjs/operators';
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root',
})
export class CRUDServiceService {
  constructor(private firestoreService: AngularFirestore) {}

  public createEntity(collectionName: string, data: {}): Observable<string> {
    return from(this.firestoreService.collection(collectionName).add(data)).pipe(
      map((value: any) => value.id),
      take(1),
    );
  }

  public getData<T>(collectionName: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query;
      })
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data: any = a.payload.doc.data();
            const { id } = a.payload.doc;
            return { id, ...data } as T;
          }),
        ),
      );
  }

  public updateObject(collectionName: string = 'tasks', id: string): Observable<void> {
    return from(
      this.firestoreService.collection(collectionName).doc(id).set({ name: 'Name' }),
    ).pipe(take(1));
  }

  public deleteObject(collectionName: string, id: string): Observable<void> {
    return from(this.firestoreService.collection(collectionName).doc(id).delete()).pipe(take(1));
  }
}
