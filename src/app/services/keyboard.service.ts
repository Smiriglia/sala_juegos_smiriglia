import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {

  subject = new Subject<string>();

  sendKey(key: string) {
    this.subject.next(key);
  }

  getKeyObserver() : Observable<string> {
    return this.subject.asObservable();
  }
}
