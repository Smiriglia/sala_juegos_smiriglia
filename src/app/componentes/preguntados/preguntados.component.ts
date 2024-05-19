import { Component, inject } from '@angular/core';
import { PreguntadosService } from '../../services/preguntados.service';
import { Observable } from 'rxjs';
import { Category, Question } from '../../interfaces/preguntados.interface';
import $ from 'jquery';
import { LoaderComponent } from '../loader/loader.component';
import { faHeartBroken, faHeartbeat, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [LoaderComponent, FontAwesomeModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  preguntadosService = inject(PreguntadosService);
  question$!: Observable<Question> | null;
  question: Question | null = null;
  img$!: Observable<string>;
  imgUrl: string | null = null;
  answers : { key: string, value: string }[] = [];
  categories! : Category[];
  answered: boolean = false;
  loadingInfo: {question: boolean, img: boolean } = {question: false, img: false};
  lives: number = 3;
  score: number = 0;
  hasEnded: boolean = false;
  

  iconHeart = faHeartbeat;
  iconHeartBroken = faHeartBroken;
  iconScore = faStar;

  constructor () {
    this.preguntadosService.getCategories().subscribe(
            {
                next: (categories) => {
                    this.categories = categories;
                    this.getQuestion()
                }
            }
        )
    }

  getQuestion() {
    this.loadingInfo.img = false;
    this.loadingInfo.question = false;
    this.question$ = this.preguntadosService.getQuestion(this.categories);
    if(this.question$ != null)
      this.question$.subscribe(
        {
          next: (question) => {
            this.question = question;

            this.answers.length = 0;
            const keys =  Object.keys(question.answers);
            const values = Object.values(question.answers)

            for (let i = 0; i < values.length; i++) {
              const answerKey = keys[i]
              const val = values[i];
              this.answers.push({key: answerKey, value: val});
              
            }
            this.answered = false;
            this.loadingInfo.question = true;
          }
        }
      );

      this.img$ = this.preguntadosService.getImg();
      this.img$.subscribe(
        {
          next: (imgUrl) => {
            this.loadingInfo.img = true;
            this.imgUrl = imgUrl;
          }
        }
      );
  }

  checkAnswer (answer : string) {
    if (this.answered) return;
    if(answer != this.question!.correct_answer)
    {
      document.getElementById(answer)!.classList.add("wrong");
      this.lives--;
      if(this.lives == 0)
        this.hasEnded = true; 
    }
    else
      this.score++;

    document.getElementById(this.question!.correct_answer)!.classList.add("correct");

    $('#btn-next').show();
    this.answered = true;
  }

  nextQuestion() {
    $('.wrong').removeClass('wrong');
    $('.correct').removeClass('correct');
    $('#btn-next').hide();
    this.getQuestion();
  }

  restart(){
    this.score = 0;
    this.lives = 3;
    this.hasEnded = false;
    this.getQuestion();
  }
}
