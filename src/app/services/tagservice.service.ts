import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import firestore = firebase.firestore;

@Injectable({
  providedIn: 'root',
})
export class TagserviceService {
  constructor(private firestoreService: AngularFirestore) {}

  public getAllTags<T>(collectionName: string, row: string, uid?: string): Observable<T[]> {
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

  public getNamesOfTags(collectionName: string): Observable<string[]> {
    return this.firestoreService
      .collection(collectionName)
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const name: string = a.payload.doc.get('name');
            return name;
          }),
        ),
      );
  }

  public getTags<T>(collectionName: string, row: string, uid: string): Observable<T[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query.where('uid', 'array-contains', uid);
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

  public getTagId(collectionName: string, row: string, name: string[]): Observable<any[]> {
    return this.firestoreService
      .collection(collectionName, (ref) => {
        const query: firestore.Query = ref;
        return query.where('name', 'in', name);
      })
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const { id }: any = a.payload.doc;
            return id;
          }),
        ),
      );
  }

  public createEntity(collectionName: string, data: {}): Observable<string> {
    return from(this.firestoreService.collection(collectionName).add(data)).pipe(
      map((value: any) => value.id),
      take(1),
    );
  }

  public update(collectionName: string = 'tasks', id: string, data: any) {
    return from(
      this.firestoreService
        .collection(collectionName)
        .doc(id)
        .update({ ...data }),
    ).pipe(take(1));
  }
}
