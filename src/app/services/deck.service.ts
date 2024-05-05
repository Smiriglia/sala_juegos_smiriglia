import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CardInterface, CardRequestInterface, DeckInterface } from '../interfaces/deck.interface';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  http = inject(HttpClient);
  private _apiPath = "https://www.deckofcardsapi.com/api/deck/";

  getDeck(): Observable<DeckInterface> {
    const reqUrl = this._apiPath + "new/shuffle/?deck_count=1"
    return this.http.get<DeckInterface>(reqUrl);
  }


  getCards(deckId: string, amount: number): Observable<CardRequestInterface> {
    const reqUrl = this._apiPath + `${deckId}/draw/?count=${amount}`;

    const sub = this.http.get<CardRequestInterface>(reqUrl);

    return sub;
  }

  parseCardValue(card: CardInterface) {
    const mapaValores: { [key: string]: string } = {
      'JACK': '11', 'QUEEN': '12', 'KING': '13', 'ACE': '1',
    }
    let value = card.value;
    if (value in mapaValores)
      value = mapaValores[value];

    card.numericValue = parseInt(value);
  }

}
