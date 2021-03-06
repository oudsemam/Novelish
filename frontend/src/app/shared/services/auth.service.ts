import { Injectable, NgZone } from '@angular/core';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { NovelishBackendService } from 'src/app/novelish-backend.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  subscription: Subscription | null = null
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public NovelishBackendService: NovelishBackendService,
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((User: any) => {
      if (User) {
        this.userData = User;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  // Sign in with email/password
   SignIn(email: any, password: any) {
    this.afAuth
      .setPersistence('session')
      .then(() => {
        this.afAuth
          .signInWithEmailAndPassword(email, password)
          .then( (result) => {
            console.log ("starting")
            this.SetUserData(result.user);
            // this.subscription = this.NovelishBackendService.updateUserUID(result.user?.email, result.user?.uid).subscribe(()=>{
              this.ngZone.run(() => {
                this.router.navigate(['home']);
              });
            // });
            console.log(result.user);
          });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(email: string, password: string) {
    // check against users table if email exists, if not alert "not authorized, please contact your admin"
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        // when create a way to add approved emails/users then turn on these comments
        // this.subscription = this.NovelishBackendService.updateUserUID(result.user?.email, result.user?.uid).subscribe((s)=>{
          this.ngZone.run(() => {
            this.router.navigate(['sign-in']);
          // });
        });
        
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: any) {
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

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
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
  async SetUserData(User: any) {
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
    console.log ("before local storage set item");
    localStorage.setItem('User', JSON.stringify(this.userData));
    console.log ("after local storage in setUserData")
    await userRef.set(this.userData, {
      merge: true,
    });
    console.log("end of setuserdata")
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('User');
      this.router.navigate(['sign-in']);
    });
  }
}
