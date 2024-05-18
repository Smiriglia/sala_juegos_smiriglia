import { Component, inject } from '@angular/core';
import { KeyboardService } from '../../services/keyboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-keyboard',
  standalone: true,
  imports: [],
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.css'
})
export class KeyboardComponent {
  letras = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];;
  disabled: Set<string> = new Set();
  keyboardService = inject(KeyboardService);
  resetSub$! : Observable<boolean> ;

  constructor () {
    this.resetSub$ = this.keyboardService.getResetObserver();
    this.resetSub$.subscribe(
      {
        next: (value) => {
          this.reset(value);
        }
      }
    );
  }  
  sendKey(key: string)
  {
    this.keyboardService.sendKey(key);
    this.disable(key);
  }

  range(start: number, end: number, step: number = 1): number[] {
    const result = [];
    for (let i = start; i < end; i += step) {
      result.push(i);
    }
    return result;
  }

  disable(letter: string) {
    this.disabled.add(letter);
  }

  reset(value : boolean) {
    if (value)
      this.disabled.clear();
  }
}
