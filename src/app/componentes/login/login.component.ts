import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  validateSingIn(email: string, password: string ) : boolean {
    if (email == "") {
      this.errorMessageIn = "Debes ingresar un email";
      return false;
    }
    if (password == "") {
      this.errorMessageIn = "Debes ingresar una contraseña";
      return false;
    }
    return true;
  }

  validateSingUp(username:string ,email: string, password: string ) : boolean {
    if (username == "") {
      this.errorMessageUp = "Debes ingresar un nombre de usuario";
      return false; 
    }
    
    if (email == "") {
      this.errorMessageUp = "Debes ingresar un email";
      return false;
    }
    

    if (password == "") {
      this.errorMessageUp = "Debes ingresar una contraseña";
      return false;
    }
    if (password.length <= 6) {
      this.errorMessageUp = "la contraseña debe tener al menos 6 caracteres";
      return false;
    }

    return true;
  }

  singIn() {
    const { email, password } = this.usuarioSingIn;
    if (this.validateSingIn(email, password)) {
      this.authService.singIn(email, password).subscribe(
        {
          next: () => {
            this.onSuccess();
          },
          error: (err) => {
            this.errorMessageIn = "Credenciales incorrectas";
          }
        }
      );
    }
  }

  singUp() {
    const { username, email, password } = this.usuarioSingUp;
    if (this.validateSingUp(username, email, password)) {
      this.authService.singUp(username, email, password).subscribe(
        {
          next: () => {
            this.onSuccess();
          },
          error: (err) => {
            this.errorMessageUp = "Datos invalidos";
          }
        }
      );
    }
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
