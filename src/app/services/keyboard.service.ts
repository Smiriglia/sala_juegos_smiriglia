import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {

  subjectKey = new Subject<string>();
  subjectReset = new Subject<boolean>();

  sendKey(key: string) {
    this.subjectKey.next(key);
  }

  sendReset(value: boolean) {
    this.subjectReset.next(value)
  }

  getKeyObserver() : Observable<string> {
    return this.subjectKey.asObservable();
  }

  getResetObserver() :  Observable<boolean> {
    return this.subjectReset.asObservable();
  }
}
