import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data


  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((User:any) => {
      if (User) {
        this.userData = User;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.clearItem('user');
      }
    });
  }

  // Sign in with email/password
  SignIn(email:string, password:string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.ngZone.run(() => {
          this.router.navigate(['explore']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email:string, password:string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser.sendEmailVerification().then(() => {
  //     this.router.navigate(['verify-email-address']);
  //   });
  // }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail:any) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const userStorage = localStorage.getItem('user');
    return userStorage !== null ? true : false;
  }

  // // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new GoogleAuthProvider());
  // }

  // Auth logic to run auth providers
  AuthLogin(provider:any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['explore']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(User:any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${User.uid}`
    );
    this.userData = {
      uid: User.uid,
      email: User.email,
      displayName: User.displayName,
      photoURL: User.photoURL,
      emailVerified: User.emailVerified,
    };
    localStorage.setItem('User', JSON.stringify(this.userData));
    return userRef.set(this.userData, {
      merge: true,
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('User');
      this.router.navigate(['sign-in']);
    });
  }
}

// Returns true when user is logged in and email is verified
// get isLoggedIn(): boolean {
//   cost user = JSON.parse(localStorage.getItem('user'));
//   return (user !== null && userInfo.emailVerified !== false) ? true : false;
// }