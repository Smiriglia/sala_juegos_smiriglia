import { Component, inject } from '@angular/core';
import $ from 'jquery';
import { Choice } from '../../interfaces/generala.interface';
import { GeneralaChart } from '../../models/generala_chart';
import { AuthService } from '../../services/auth.service';
import { faFastForward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-generala',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './generala.component.html',
  styleUrl: './generala.component.css'
})
export class GeneralaComponent {
  authService = inject(AuthService);
  dices: Array<number> = [1, 1, 1, 1, 1];
  rollCount: number = 0;
  selected : Set<number> = new Set();
  chart: GeneralaChart = new GeneralaChart();
  choices: Choice[] = [];
  turn: number = 0;
  nextIcon = faFastForward;
  
  getImg(dice: number) {
    return "assets/generala/" + dice + ".png";
  }

  roll() {
    for (let index = 0; index < this.dices.length; index++) {
      this.dices[index] = Math.floor(Math.random() * 6 + 1);
    }
    this.rollCount++;
    this.getChoices();
  }

  isSelected(index : number) {
    return this.selected.has(index);
  }

  onDiceClick(index: number) {
    const dice = $(`#${index}`)
    if (dice.hasClass('selectable'))
    {
      if (dice.hasClass('selected'))
        this.selected.delete(index);
      else
      this.selected.add(index);
        
    }
  }

  rollSelected() {
    const selected = this.selected.values();
    for (let index of selected)
    {
      this.dices[index] = Math.floor(Math.random() * 6 + 1);
    }
    this.rollCount++;
    this.getChoices();
  }

  getChoices() {
    this.choices = this.chart.getChoices(this.dices);
  }

  chose(choice: Choice){
    if (this.rollCount > 0 && this.chart.chose(choice))
      this.nextTurn();
  }

  cross(property: string){
    if (this.rollCount > 0 && this.chart.chose({name: 'tachar', property: property, value: null}))
      this.nextTurn();
  }

  getChart() {
    const chartAux : Array<{key: string, value: number | null}> = [];
    const keys =  Object.keys(this.chart);
    const values = Object.values(this.chart)

    for (let i = 0; i < values.length - 1; i++) {
      const answerKey: string = keys[i].slice(1);
      const val : number | null = values[i];
      chartAux.push({key: answerKey, value: val});
    }

    return chartAux;
  }

  nextTurn() {
    this.rollCount = 0;
    this.chart.rollCount = 0;
    this.choices.length = 0;
    this.selected.clear();
    this.turn++;
  }

  restart() {
    this.rollCount = 0;
    this.chart = new GeneralaChart();
    this.choices.length = 0;
    this.selected.clear();
    this.turn = 0;
  }

}
