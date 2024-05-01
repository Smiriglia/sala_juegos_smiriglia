import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { faHome, faInfo, faComments, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  iconHome = faHome;
  iconAbout = faInfo;
  iconChat = faComments;
  iconSingOut = faSignOut;
  iconUser = faUser;

  goTo(path: string) {
    this.router.navigate([path]);
  }

  logOut()
  {
    this.authService.logOut()
  }
}
