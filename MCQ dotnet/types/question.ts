export interface Question {
  id: string
  question: string
  options: {
    [key: string]: string
  }
  answer: string
  source: string
}
