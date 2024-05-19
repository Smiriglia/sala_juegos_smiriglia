export interface PexelSearch {
    photos: Array<PexelImg>
    next_page: string,
}

export interface PexelImg {
    src: { original: string },
} 

export interface CategorySearch  {
    categories: Category[],
}

export interface Category  {
    name: string,
    count_questions: number,
    link: string
}

export interface Question {
    category: string,
    question: string,
    answers: Answers,
    correct_answer: string
}

export interface Answers {
    answer_a?: string,
    answer_b?: string,
    answer_c?: string,
    answer_d?: string,
} 
