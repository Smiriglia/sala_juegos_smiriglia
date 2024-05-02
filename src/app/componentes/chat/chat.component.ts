import { AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MensajeComponent } from '../mensaje/mensaje.component';
import { UserInterface } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MensajeComponent, FontAwesomeModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements AfterViewChecked {
  authService = inject(AuthService);
  chatService = inject(ChatService);
  iconLocationArrow = faLocationArrow;
  texto: string = "";
  eventListener: any;


  ngAfterViewChecked(): void {
    // this.ScrollToBottom();
    this.eventListener = this.ScrollToBottom.bind(this);
    document.addEventListener('scroll-chat', this.eventListener);
  }

  send(event: Event) {
    event.preventDefault();
    if (this.texto.trim() != "") {
      this.chatService.sendMessage(this.authService.currentUserSignal()!, this.texto).subscribe(
        {
          error: () => {
            console.log("Error al enviar mensaje");
          }
        }
      );
      this.texto = ""
    }
  }

  ScrollToBottom() {
    setTimeout(
      () => {
        var endOfChat: HTMLElement | null = document.getElementById("endOfChat")!;
        if (endOfChat) {
          endOfChat.scrollIntoView({ behavior: 'smooth' });
        }
      },
      100
    )

  }


}
