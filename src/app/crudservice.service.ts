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

  public getData<T>(collectionName: string, row: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query.where('row', '==', row);
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

  public update(data: any) {
    return this.firestoreService
      .collection('tasks')
      .doc(data.payload.doc.id)
      .set({ completed: true }, { merge: true });
  }

  public updateObject(collectionName: string = 'tasks', id: string, data: any): Observable<void> {
    return from(
      this.firestoreService.collection(collectionName).doc(id).set({
        name: data.name,
        row: data.row,
        text: data.text,
        deadline: data.deadline,
        tags: data.tags,
      }),
    ).pipe(take(1));
  }

  public deleteObject(collectionName: string, id: string): Observable<void> {
    return from(this.firestoreService.collection(collectionName).doc(id).delete()).pipe(take(1));
  }
}
