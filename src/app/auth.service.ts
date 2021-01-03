import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { from, Observable, of } from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { CRUDServiceService } from './crudservice.service';
import { User } from './user';
import auth = firebase.auth;
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<any>;

  constructor(
    private angAuthService: AngularFireAuth,
    private crudServiceService: CRUDServiceService,
    private firestoreService: AngularFirestore,
  ) {
    this.user$ = this.angAuthService.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestoreService.doc(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      }),
    );
  }

  public googleAuth(): Observable<UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    return from(this.angAuthService.signInWithPopup(provider)).pipe(
      tap((userCred: auth.UserCredential) => {
        if (userCred) {
          this.updateUserData(userCred.user);
        }
      }),
    );
  }

  public signOut(): Observable<void> {
    return from(this.angAuthService.signOut()).pipe(take(1));
  }

  private updateUserData(user: firebase.User | null): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.firestoreService.doc(`users/${user?.uid}`);
    const data = {
      uid: user?.uid,
      email: user?.email,
      displayName: user?.displayName,
      photoURL: user?.photoURL,
    };
    return userRef.set(data, {merge: true});
  }

  public checkAuth(): Observable<any> {
    return this.user$.pipe(
      take(1),
      map((value) => !!value),
      tap((isLogged) => {
        return isLogged;
      }),
    );
  }
}
