import { Injectable, inject, signal } from '@angular/core';

import { Auth, createUserWithEmailAndPassword, user } from '@angular/fire/auth';
import { signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@firebase/auth';

import firebase from 'firebase/compat/app';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);

  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<UserInterface | null | undefined>(undefined);

  singIn(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(() => { });
    return from(promise);
  }

  singUp(username: string, email: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(
      res => updateProfile(res.user, { displayName: username })
    );
    return from(promise);
  }

  logOut(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  singInWithGoogle(): Observable<void> {
    const promise = signInWithPopup(this.firebaseAuth, new GoogleAuthProvider())
      .then(() => { });

    return from(promise);
  }

  singInWithFB(): Observable<void> {
    const promise = signInWithPopup(this.firebaseAuth, new FacebookAuthProvider())
      .then(() => { });

    return from(promise);
  }

  singInWithGitHub(): Observable<void> {
    const promise = signInWithPopup(this.firebaseAuth, new GithubAuthProvider())
      .then(() => { });

    return from(promise);
  }

}
