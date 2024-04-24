import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = "sala de juegos";

  constructor(private router: Router) {

  }

  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe(
      (user) => {
        if (user)
        {
          this.authService.currentUserSignal.set({
            email: user.email!,
            username: user.displayName!,
          });
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

  logOut()
  {
    this.authService.logOut()
  }
}