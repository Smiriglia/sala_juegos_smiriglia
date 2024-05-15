import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FirestoreService } from './services/firestore.service';
import { NavbarComponent } from './componentes/navbar/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = "sala de juegos";

  constructor(private router: Router) {

  }

  authService = inject(AuthService);
  firestoreService = inject(FirestoreService);
  ngOnInit(): void {
    
    this.authService.user$.subscribe(
      (user) => {
        if (user)
        {
          this.authService.currentUserSignal.set({
            email: user.email!,
            username: user.displayName ? user.displayName : "User" ,
          });
          this.firestoreService.RegisterLogin(user.email!);
          if(this.router.url == "/login")
          {
            this.goTo("home")
          }
        }
        else
        {
          this.authService.currentUserSignal.set(null);
          this.goTo("login");
        }
      }
    )
  }

  goTo(path: string) {
    this.router.navigate([path]);
  }
}