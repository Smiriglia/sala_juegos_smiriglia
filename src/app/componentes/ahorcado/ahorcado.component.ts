import { Component, inject } from '@angular/core';
import { KeyboardComponent } from '../keyboard/keyboard.component';
import { KeyboardService } from '../../services/keyboard.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LetterInterface } from '../../interfaces/letter.interface';
import { removeAccents } from '@ng-bootstrap/ng-bootstrap/util/util';
import { faHeartbeat, faHeartBroken, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [KeyboardComponent, FontAwesomeModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  keyboardService = inject(KeyboardService);
  http = inject(HttpClient);
  keyboardSub$!: Observable<string>;
  attempt: number = 0;
  word: LetterInterface[] = [];
  mensaje = "";

  hasLost: boolean = false;
  hasWon: boolean = false;

  iconHeart = faHeartbeat;
  iconHeartBroken = faHeartBroken;
  iconRefresh = faRefresh;

  constructor() {
    this.keyboardSub$ = this.keyboardService.getKeyObserver();
    this.keyboardSub$.subscribe(
      {
        next: (key) => {
          this.compareKey(key);
        }
      }
    );
    this.getWord();
  }

  getImg() {
    return "assets/ahorcado/" + this.attempt + ".png";
  }

  getWord() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = 'https://clientes.api.greenborn.com.ar/public-random-word';
    this.http.get(url).subscribe(
      {
        next: (response) => {
          this.setWord(response.toString());
        }
      }
    )
  }

  setWord(newWord: string) {
    let normalizedWord: string = this.normalize(newWord);

    console.log(normalizedWord);
    this.word = [];
    for (let letra of normalizedWord) {
      this.word.push({ 'letter': letra, 'hidden': true });
    }

    this.attempt = 0;
    this.hasLost = false;
    this.hasWon = false;
    this.mensaje = "";
  }

  normalize(word: string) {
    let auxWord = word.toLowerCase();
    let normalizedWord = "";
    for (let char of auxWord) {
      normalizedWord += this.removeAccent(char);
    }


    return normalizedWord;
  }
  removeAccent(char: string) {
    const mapaAcentos: { [key: string]: string } = {
      'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
    }
    if(char in mapaAcentos)
      return mapaAcentos[char];
    else 
      return char;
  }


  compareKey(key: string) {
    
    if (this.hasLost || this.hasWon) return;

    let counter = 0;

    let hasKey: boolean = false;
    for (let letter of this.word) {
      if (letter.letter == key) {
        letter.hidden = false;
        hasKey = true;
      }
      if (!letter.hidden) {
        counter++;
      }
    }

    if (!hasKey) {
      this.attempt++;
    }

    if (counter >= this.word.length) {
      this.mensaje = "Ganaste";
      this.hasWon = true;
    }

    if (this.attempt > 5) {
      this.mensaje = "Perdiste, vuelve a intentar";
      this.hasLost = true;
    }
  }
  getColorMsg() {
    // return 'color:' + this.hasWon ? 'red' : 'green';
    return {
      'color': this.hasWon ? 'green' : 'red',
      'font-size': '24px',
    }
  }
}
