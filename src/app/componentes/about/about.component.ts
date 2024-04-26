import { AfterViewInit, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent{
  slideIndex: number = 1;
  actualNav: HTMLElement | null = null;
  iconGitHub = faGithub;
  iconLock = faLock;


  changeSlide(newIndex: number)
  {
    var actualNav: HTMLElement = document.getElementById("slide-" + this.slideIndex + "-nav")!;
    actualNav.classList.remove('selected');

    this.slideIndex = newIndex;

    var actualNav: HTMLElement = document.getElementById("slide-" + this.slideIndex + "-nav")!;
    actualNav.classList.add('selected');
    this.scrollToElement(this.slideIndex);
  }

  scrollToElement(elementIndex: number)
  {
    
    var element: HTMLElement = document.getElementById("slide-" + this.slideIndex)!;
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
