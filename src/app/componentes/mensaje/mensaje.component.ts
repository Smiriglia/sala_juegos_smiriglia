import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DateDisplayPipe } from '../../pipes/date-display.pipe';
import { MessageInterface } from '../../interfaces/message.interface';

@Component({
  selector: 'app-mensaje',
  standalone: true,
  imports: [DateDisplayPipe],
  templateUrl: './mensaje.component.html',
  styleUrl: './mensaje.component.css'
})
export class MensajeComponent implements OnInit {
  authService = inject(AuthService);
  @Input() message!: MessageInterface;
  srcImage : string = "assets/chat/default_profile_picture.png";
  isSender: boolean = false;
  justify: string = "justify-content-start";
  msgContainer: string = "msg_container";
  msgTime: string = "msg_time";
  timeStr: string = "";
  username!: string;


  ngOnInit(): void {
    if (this.message.sender.email == this.authService.currentUserSignal()?.email) {
      this.isSender = true;
      this.justify = "justify-content-end";
      this.msgContainer = "msg_container_send";
      this.msgTime = "msg_time_send";
    }
    this.username = this.message.sender.username;
    if(this.username.length > 11)
    {
      this.username = this.username.slice(0,8) + "..."
    }
  }



}
