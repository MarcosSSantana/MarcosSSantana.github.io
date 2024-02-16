export interface Option {
    id: number;
    name: string;
    alias: string;
}

export interface Question {
    id: number;
    question: string;
    options: Option[];
}

export interface Results {
    [key: string]: string;
}

export interface QuizData {
    title: string;
    questions: Question[];
    results: Results;
}