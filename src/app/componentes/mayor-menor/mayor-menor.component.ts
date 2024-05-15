import { Component, OnInit, inject } from '@angular/core';
import { DeckService } from '../../services/deck.service';
import { Observable, takeUntil } from 'rxjs';
import { CardInterface, CardRequestInterface, DeckInterface } from '../../interfaces/deck.interface';
import { faStar, faTrophy, faInfoCircle, faChevronCircleRight, faChevronCircleLeft, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent implements OnInit {

  deckService = inject(DeckService);
  deck$!: Observable<DeckInterface>;
  deck!: DeckInterface;
  cardReq: CardRequestInterface | null = null;
  prevCard: CardInterface | null = null;
  actualCard: CardInterface | null = null;

  score: number = 0;
  highScore: number = parseInt(localStorage.getItem('high-score')?? '0');

  busy: boolean = false;
  hasEnded: boolean = false;

  iconScore = faStar;
  iconHighestScore = faTrophy;
  iconRemaining = faInfoCircle;
  iconLower = faChevronCircleLeft;
  iconHigher = faChevronCircleRight;
  iconReload = faRefresh;




  ngOnInit(): void {
    this.getDeck()
  }


  getDeck() {
    this.deck$ = this.deckService.getDeck();
    this.deck$.subscribe(
      {
        next: (newDeck) => {
          this.score = 0;
          this.deck = newDeck;
          this.hasEnded = false;
          this.deckService.getCards(newDeck.deck_id, 2).subscribe(
            {
              next: (newCardReq) => {
                this.cardReq = newCardReq;
                this.prevCard = this.cardReq.cards[0];
                this.actualCard = this.cardReq.cards[1];

                this.deckService.parseCardValue(this.prevCard);
                this.deckService.parseCardValue(this.actualCard);
                this.show("prev-card");
              }
            }
          );
        }
      }
    );
  }

  getCard() {
    this.deckService.getCards(this.deck.deck_id, 1).subscribe(
      {
        next: (newCardReq) => {
          this.cardReq = newCardReq;
          this.prevCard = this.actualCard;
          this.actualCard = newCardReq.cards[0];
          this.deckService.parseCardValue(this.actualCard);
        }
      }
    );
  }

  show(cardId: string) {
    let card: HTMLElement = document.getElementById(cardId)!;
    card.classList.add("show");
  }

  hide(cardId: string) {
    let card: HTMLElement = document.getElementById(cardId)!;
    card.classList.remove("show");
    card.classList.remove("correct");
    card.classList.remove("wrong");
  }

  setCorrect(cardId: string) {
    let card: HTMLElement = document.getElementById(cardId)!;
    card.classList.add("correct");
  }

  setWrong(cardId: string) {
    let card: HTMLElement = document.getElementById(cardId)!;
    card.classList.add("wrong");
  }

  chooseHigher() {
    this.choose((prev, actual) => actual.numericValue >= prev.numericValue)
  }

  chooseLower() {
    this.choose((prev, actual) => actual.numericValue <= prev.numericValue)
  }

  choose(callback: (prev: CardInterface, actual: CardInterface) => boolean) {
    if (this.busy || this.hasEnded) return;
    this.busy = true;

    this.show('actual-card');
    if (callback(this.prevCard!, this.actualCard!)) {
      this.score++;
      this.setCorrect('actual-card');
      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem('high-score', this.highScore.toString());
      }
    }
    else {
      this.setWrong('actual-card');
    }

    setTimeout(() => {
      this.hide('actual-card');
      if (this.cardReq?.remaining! > 0) {
        this.getCard();
      }
      else {
        this.hasEnded = true;
      }
      this.busy = false;
    },
      1500,
    );
  }
}
