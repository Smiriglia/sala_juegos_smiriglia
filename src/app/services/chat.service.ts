import { Injectable, inject, signal } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { UserInterface } from '../interfaces/user.interface';
import { Observable, from } from 'rxjs';
import { Timestamp, orderBy, query } from 'firebase/firestore';
import { MessageInterface } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private firestore = inject(Firestore);
  messagesSignal = signal<MessageInterface[]>([]);
  private chatFire$!: Observable<MessageInterface[]>;

  constructor() {
    this.getMessages();
  }

  sendMessage(sender: UserInterface, texto: string) {
    let col = collection(this.firestore, 'chats');
    let mensaje: MessageInterface = {
      'sender': sender,
      'texto': texto,
      'fecha': Timestamp.fromDate(new Date()),
    };
    const promise = addDoc(col, mensaje);

    return from(promise);
  }


  private getMessages() {
    let col = collection(this.firestore, 'chats');

    const queryAll = query(col, orderBy('fecha', 'asc'));

    this.chatFire$ = collectionData(queryAll) as Observable<MessageInterface[]>;


    this.chatFire$.subscribe(
      {
        next: (messages) => {
          if (messages)
          {
            this.messagesSignal.set(messages)
            const event = new CustomEvent('scroll-chat');
            document.dispatchEvent(event);
          }
        },
        error: (err) => {
          console.log(err)
        }
      }
    );
  }
}
