import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FontAwesomeModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);


  googleIcon = faGoogle;
  fbIcon = faFacebook;
  githubIcon = faGithub;

  usuarioSingIn = {
    email: '',
    password: '',
  };

  usuarioSingUp = {
    username: '',
    email: '',
    password: '',
  };
  errorMessageIn: String | null = null;
  errorMessageUp: String | null = null;


  

  goTo(path: string)
  {
    this.router.navigate([path]);
  }

  onSuccess()
  {
    
    this.goTo("home");
  }

  singIn() {
    const { email, password } = this.usuarioSingIn;
    this.authService.singIn(email, password).subscribe(
      {
        next: () => {
          this.onSuccess();
        },
        error: (err) => {
          this.errorMessageIn = err.code;
        }
      }
    );
  }

  singUp() {
    const { username, email, password } = this.usuarioSingUp;
    this.authService.singUp(username, email, password).subscribe(
      {
        next: () => {
          this.onSuccess();
        },
        error: (err) => {
          this.errorMessageUp = err.code;
        }
      }
    );
  }

  singInWithGoogle()
  {
    this.authService.singInWithGoogle().subscribe(
      {
        next: () => {
          this.onSuccess();
        },
        error: (err) => {
          this.errorMessageIn = err.code;
          this.errorMessageUp = err.code;
        }
      }
    );
  }

  singInWithFB()
  {
    this.authService.singInWithFB().subscribe(
      {
        next: () => {
          this.onSuccess();
        },
        error: (err) => {
          this.errorMessageIn = err.code;
          this.errorMessageUp = err.code;
        }
      }
    );
  }

  singInWithGitHub()
  {
    this.authService.singInWithGitHub().subscribe(
      {
        next: () => {
          this.onSuccess();
        },
        error: (err) => {
          this.errorMessageIn = err.code;
          this.errorMessageUp = err.code;
        }
      }
    );
  }

  goToSignUp() {
    var container = document.getElementById('container');
    container?.classList.add("right-panel-active");
  }
  goToSignIn() {
    var container = document.getElementById('container');
    container?.classList.remove("right-panel-active");
  }

  fillTest() {
    this.usuarioSingIn.email = "test@gmail.com";
    this.usuarioSingIn.password = "test123";
  }

  fillAdmin() {
    this.usuarioSingIn.email = "admin@gmail.com";
    this.usuarioSingIn.password = "test123";
  }
}
