import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject, Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Category, CategorySearch, PexelSearch, Question } from '../interfaces/preguntados.interface';

@Injectable({
  providedIn: 'root'
})
export class PreguntadosService { 
    http = inject(HttpClient);
    questionsUrl = 'https://www.preguntapi.dev/api/categories';
    imgUrl = "https://api.pexels.com/v1/search?query=coding&per_page=1";


    getCategories() : Observable<Category[]> {
        return this.http.get<CategorySearch>(this.getCorsProxiedUrl(this.questionsUrl)).pipe(
            map((categorySearch) => categorySearch.categories)
        );
    }

    getQuestion(categories: Category[]) : Observable<Question>  {

        const randomIndexC = Math.floor(Math.random() * categories.length);
        const category = categories[randomIndexC];
        
        return this.http.get<Question[]>(this.getCorsProxiedUrl(category.link))
        .pipe
        (
            map((questions) => {
                const randomIndexQ = Math.floor(Math.random() * questions.length);
                return questions[randomIndexQ];
            })
        )
    }

    getImg() : Observable<string> {
        return this.http.get<PexelSearch>(`${this.imgUrl}?query=coding&per_page=1`, {headers: {
            Authorization: environment.pexel_key,
        }})
        .pipe(
            map((value : PexelSearch) => {
                this.imgUrl = value.next_page;
                return value.photos[0].src.original;
            })
        );
    }

    getCorsProxiedUrl(url: string): string
    {
        return `https://web-production-a719.up.railway.app/${url}`;
    }
}